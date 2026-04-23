-- ============================================================
-- ECOMMERCE SCHEMA — Run this in Supabase SQL Editor
-- ============================================================

-- PROFILES (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  avatar_url text,
  phone text,
  address text,
  city text,
  is_admin boolean default false,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Admins can view all profiles" on profiles for select using (
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- CATEGORIES
create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  created_at timestamptz default now()
);
alter table public.categories enable row level security;
create policy "Public read categories" on categories for select to anon, authenticated using (true);
create policy "Admins manage categories" on categories for all using (
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);

-- BRANDS
create table if not exists public.brands (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  logo_url text,
  description text,
  created_at timestamptz default now()
);
alter table public.brands enable row level security;
create policy "Public read brands" on brands for select to anon, authenticated using (true);
create policy "Admins manage brands" on brands for all using (
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);

-- PRODUCTS
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null default 0,
  sale_price numeric(10,2),
  stock integer default 0,
  category_id uuid references categories(id) on delete set null,
  brand_id uuid references brands(id) on delete set null,
  is_featured boolean default false,
  is_active boolean default true,
  images text[] default '{}',
  video_url text,
  created_at timestamptz default now()
);
alter table public.products enable row level security;
create policy "Public read active products" on products for select to anon, authenticated using (is_active = true);
create policy "Admins manage products" on products for all using (
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);
create index on products(slug);
create index on products(category_id);
create index on products(brand_id);
create index on products(is_featured) where is_featured = true;

-- REVIEWS
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references products(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  rating integer check (rating between 1 and 5) not null,
  comment text,
  created_at timestamptz default now(),
  unique(product_id, user_id)
);
alter table public.reviews enable row level security;
create policy "Public read reviews" on reviews for select to anon, authenticated using (true);
create policy "Users can write own review" on reviews for insert with check (auth.uid() = user_id);
create policy "Users can update own review" on reviews for update using (auth.uid() = user_id);

-- ORDERS
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  status text default 'pending' check (status in ('pending','confirmed','shipped','delivered','cancelled')),
  total numeric(10,2) not null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  address text not null,
  city text not null,
  notes text,
  created_at timestamptz default now()
);
alter table public.orders enable row level security;
create policy "Users view own orders" on orders for select using (auth.uid() = user_id);
create policy "Users create orders" on orders for insert with check (auth.uid() = user_id or user_id is null);
create policy "Admins manage orders" on orders for all using (
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);

-- ORDER ITEMS
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  product_image text,
  price numeric(10,2) not null,
  quantity integer not null
);
alter table public.order_items enable row level security;
create policy "Order items visible with order" on order_items for select using (
  exists (select 1 from orders where id = order_id and user_id = auth.uid())
  or exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);
create policy "Insert order items" on order_items for insert with check (true);

-- BANNERS
create table if not exists public.banners (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  subtitle text,
  image_url text not null,
  link text,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);
alter table public.banners enable row level security;
create policy "Public read active banners" on banners for select to anon, authenticated using (is_active = true);
create policy "Admins manage banners" on banners for all using (
  exists (select 1 from profiles where id = auth.uid() and is_admin = true)
);

-- WISHLISTS
create table if not exists public.wishlists (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  product_id uuid references products(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, product_id)
);
alter table public.wishlists enable row level security;
create policy "Users manage own wishlist" on wishlists for all using (auth.uid() = user_id);

-- FULL TEXT SEARCH
alter table products add column if not exists search_vector tsvector
  generated always as (to_tsvector('english', coalesce(name,'') || ' ' || coalesce(description,''))) stored;
create index if not exists products_search_idx on products using gin(search_vector);

-- SEED: Sample categories
insert into categories (name, slug, image_url) values
  ('Car Care', 'car-care', '/categories/car-care.jpg'),
  ('Detailing', 'detailing', '/categories/detailing.jpg'),
  ('Accessories', 'accessories', '/categories/accessories.jpg'),
  ('Tools', 'tools', '/categories/tools.jpg')
on conflict (slug) do nothing;

-- SEED: Sample brands
insert into brands (name, slug, logo_url) values
  ('Carpro', 'carpro', '/brands/carpro.png'),
  ('Gyeon', 'gyeon', '/brands/gyeon.png'),
  ('Sonax', 'sonax', '/brands/sonax.png'),
  ('Meguiar''s', 'meguiars', '/brands/meguiars.png'),
  ('Chemical Guys', 'chemical-guys', '/brands/chemical-guys.png')
on conflict (slug) do nothing;
