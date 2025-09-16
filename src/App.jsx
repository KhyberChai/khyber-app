import React, { useEffect, useMemo, useState } from "react";

const STORE = {
  name: "Khyber Chai House",
  address: "17483 60 Avenue, Surrey, BC V3S 1T9",
  phone: "+1 604-353-6312",
  hours: "Daily 11:00–24:00 (Fri–Sat to 01:00)",
};

const DELIVERY_LINKS = {
  ubereats: "https://www.ubereats.com/ca/store/khyber-chai-house-436-richards-st/W3ihKJvuWOirQyQJGPkuKw?utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas",
  doordash: "https://www.doordash.com/store/khyber-chai-house-vancouver-35650189/79383555/?rwg_token=ACgRB3flFeFbuNQBAYYKSJeNMUZ-F0gvOb0xC63zaIa2trs1ffGpiEogo4FNRnEF83cx4G2ETnXmmLnkF0fLHfZ-_wRNSC62Ww==&utm_campaign=gpa",
};

const SQUARE_CHECKOUT = "https://khyberchai.square.site/";
const WHATSAPP_CLICK_TO_CHAT = "https://wa.me/16043536312";

const MENU = [
  { name: "Hot Drinks", items: [
    { id: "hot-special", title: "Special Khyber Chai", price: "2.99" },
    { id: "hot-karak", title: "Karak Chai", price: "3.10" },
    { id: "hot-green", title: "Peshawari Green Tea", price: "2.99" },
    { id: "hot-kashmiri", title: "Pink (Kashmiri) Chai", price: "3.49" },
    { id: "hot-masala", title: "Masala Chai", price: "3.49" },
  ]},
  { name: "Espresso Bar", items: [
    { id: "esp-americano", title: "Americano", price: "3.29" },
    { id: "esp-capp", title: "Cappuccino", price: "3.99" },
    { id: "esp-latte", title: "Latte", price: "3.99" },
    { id: "esp-flatwhite", title: "Flat White", price: "3.99" },
    { id: "esp-macchiato", title: "Macchiato", price: "3.99" },
  ]},
  { name: "Cold Drinks", items: [
    { id: "cold-lem", title: "Peshawari Lemonade", price: "4.99" },
    { id: "cold-mango-fresh", title: "Mango Refresher", price: "4.99" },
    { id: "cold-kandahari", title: "Kandahari Lassi", price: "4.99" },
    { id: "cold-jarritos", title: "Jarritos", price: "2.99" },
    { id: "cold-water", title: "Water", price: "1.99" },
  ]},
  { name: "Milkshakes", items: [
    { id: "shake-mango", title: "Mango Milkshake", price: "9.99" },
    { id: "shake-strawberry", title: "Strawberry Milkshake", price: "8.99" },
    { id: "shake-ferrero", title: "Ferrero Rocher Milkshake", price: "11.99" },
    { id: "shake-kittay", title: "Kittay Milkshake", price: "11.99" },
    { id: "shake-blend", title: "Blend Milkshake", price: "11.99" },
  ]},
  { name: "Paratha Rolls", items: [
    { id: "roll-beef", title: "Beef", price: "12.99" },
    { id: "roll-chicken", title: "Chicken", price: "11.99" },
    { id: "roll-seekh", title: "Seekh Kebab", price: "11.99" },
    { id: "roll-paneer", title: "Paneer", price: "11.99" },
    { id: "roll-aloo", title: "Aloo Tikki", price: "9.99" },
  ]},
  { name: "Rice Bowls", items: [
    { id: "bowl-butter", title: "Butter Chicken", price: "12.99" },
    { id: "bowl-paneer", title: "Paneer Makhni", price: "12.99" },
    { id: "bowl-tandoori", title: "Tandoori Chicken", price: "12.99" },
    { id: "bowl-seekh", title: "Seekh Kebab", price: "12.99" },
    { id: "bowl-nchips", title: "Meat n' Chips", price: "12.99" },
  ]},
  { name: "Street Bites", items: [
    { id: "bite-anday", title: "Anday Wala Burger", price: "9.99" },
    { id: "bite-afghani", title: "Afghani Burger", price: "9.99" },
    { id: "bite-chicken-burger", title: "Chicken Burger", price: "9.99" },
    { id: "bite-veggie-burger", title: "Veggie Burger", price: "9.99" },
    { id: "bite-samosa-chaat", title: "Samosa Chaat", price: "6.99" },
    { id: "bite-channa-chaat", title: "Channa Chaat", price: "5.99" },
  ]},
  { name: "Dumplings & Sides", items: [
    { id: "side-mantu", title: "Beef Mantu", price: "7.99" },
    { id: "side-momo", title: "Chicken Momo", price: "7.99" },
    { id: "side-veg-momo", title: "Veggie Momo", price: "7.99" },
    { id: "side-nuggets", title: "Nuggets", price: "7.99" },
    { id: "side-fries", title: "Fries", price: "3.99" },
    { id: "side-samosa", title: "Samosa", price: "2.49" },
  ]},
  { name: "Parathas", items: [
    { id: "paratha-chicken", title: "Chicken Paratha", price: "7.99" },
    { id: "paratha-cheese", title: "Cheese Paratha", price: "5.99" },
    { id: "paratha-nutella", title: "Nutella Paratha", price: "5.99" },
    { id: "paratha-classic", title: "Classic Paratha", price: "4.99" },
  ]},
  { name: "Dessert", items: [
    { id: "dessert-slice", title: "Slice of the Day", price: "4.99" },
    { id: "dessert-cream", title: "Cream Roll", price: "4.99" },
    { id: "dessert-nanaimo", title: "Nanaimo Bar", price: "3.99" },
    { id: "dessert-choc", title: "Chocolate Chunk", price: "1.99" },
    { id: "dessert-cookie", title: "Cookie", price: "" },
  ]},
  { name: "Pairs Well", items: [
    { id: "pair-chai-samosa", title: "Chai + Samosa", price: "5.49" },
    { id: "pair-chai-paratha", title: "Chai + Paratha", price: "5.49" },
    { id: "pair-roll-jarritos", title: "Roll + Jarritos", price: "11.99" },
    { id: "pair-bowl-jarritos", title: "Bowl + Jarritos", price: "11.99" },
    { id: "pair-wayo-jarritos", title: "Wayo + Guava Jarritos", price: "10.99" },
  ]},
  { name: "On a Budget", items: [
    { id: "budget-carrot", title: "Carrot Cake", price: "2.99" },
    { id: "budget-warming-bun", title: "Warming Bun", price: "3.99" },
    { id: "budget-tiramisu", title: "Tiramisu", price: "3.99" },
    { id: "budget-blueberry", title: "Blueberry Cupcake", price: "2.99" },
  ]},
];

const currency = (v) => {
  const n = Number(v);
  if (Number.isFinite(n)) return `$${n.toFixed(2)}`;
  return v || "";
};

function classNames(...c){return c.filter(Boolean).join(" ")}

function usePWA(){
  React.useEffect(()=>{
    const manifest = {
      name: "Khyber Chai House",
      short_name: "Khyber Chai",
      start_url: ".",
      display: "standalone",
      background_color: "#7a1313",
      theme_color: "#7a1313"
    };
    const link=document.createElement("link");link.rel="manifest";
    link.href="data:application/json;base64,"+btoa(JSON.stringify(manifest));
    document.head.appendChild(link);
    if("serviceWorker" in navigator){
      const swCode = `self.addEventListener('install', e=>{e.waitUntil(caches.open('khyber-app-v1').then(c=>c.addAll(['./'])))});self.addEventListener('fetch', e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))})`;
      const blob = new Blob([swCode],{type:"text/javascript"});
      const url = URL.createObjectURL(blob);
      navigator.serviceWorker.register(url).catch(()=>{});
    }
  },[]);
}

export default function App(){
  usePWA();
  const [dark,setDark]=React.useState(true);
  const [query,setQuery]=React.useState("");
  const [cart,setCart]=React.useState({});
  const [notes,setNotes]=React.useState("");
  const [tipPct,setTipPct]=React.useState(0);
  const [mode,setMode]=React.useState("pickup");

  const items=React.useMemo(()=>{
    if(!query) return MENU;
    const q=query.toLowerCase();
    return MENU.map(s=>({...s,items:s.items.filter(i=>[s.name,i.title].join(" ").toLowerCase().includes(q))})).filter(s=>s.items.length);
  },[query]);

  const flatItems=React.useMemo(()=>MENU.flatMap(s=>s.items.reduce((m,i)=>({...m,[i.id]:i}),{})),[]);

  const add=(id)=>{
    const item = flatItems[id] || MENU.flatMap(s=>s.items).find(x=>x.id===id);
    if(!item) return;
    setCart(c=>({...c,[id]:{item,qty:(c[id]?.qty||0)+1}}));
  };
  const dec=(id)=>setCart(c=>{const n={...c}; if(!n[id]) return c; n[id].qty-=1; if(n[id].qty<=0) delete n[id]; return n;});
  const remove=(id)=>setCart(c=>{const n={...c}; delete n[id]; return n;});

  const subtotal=Object.values(cart).reduce((s,{item,qty})=>{
    const n=Number(item.price); return s+(Number.isFinite(n)?n*qty:0);
  },0);
  const tax=subtotal*0.05;
  const tip=subtotal*(tipPct/100);
  const total=subtotal+tax+tip;

  const checkout=()=>{
    if(mode==="pickup"){ window.location.href=SQUARE_CHECKOUT; }
    else { window.location.href=DELIVERY_LINKS.ubereats || DELIVERY_LINKS.doordash; }
  };

  return (
    <div className={classNames(dark ? "dark" : "", "min-h-screen")}>
      <div className="bg-neutral-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
        <header className="sticky top-0 z-30 backdrop-blur border-b border-zinc-200/50 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/70">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="flex-1">
              <h1 className="text-xl font-bold tracking-wide">{STORE.name}</h1>
              <p className="text-xs opacity-80">{STORE.hours}</p>
            </div>
            <button onClick={()=>setDark(d=>!d)} className="text-sm px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-700">
              {dark ? "Light" : "Dark"}
            </button>
          </div>
          <div className="max-w-4xl mx-auto px-4 pb-3">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search menu…" className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/70 px-4 py-2 text-sm focus:outline-none" />
          </div>
        </header>

        <section className="max-w-4xl mx-auto px-4 pt-4 flex items-center gap-3">
          <a href={WHATSAPP_CLICK_TO_CHAT} target="_blank" rel="noreferrer" className="text-sm underline">Chat on WhatsApp</a>
          <span className="text-xs opacity-70">•</span>
          <a href={SQUARE_CHECKOUT} target="_blank" rel="noreferrer" className="text-sm underline">Square Online Ordering</a>
          <span className="text-xs opacity-70">•</span>
          <a href={DELIVERY_LINKS.ubereats} target="_blank" rel="noreferrer" className="text-sm underline">UberEats</a>
          <span className="text-xs opacity-70">•</span>
          <a href={DELIVERY_LINKS.doordash} target="_blank" rel="noreferrer" className="text-sm underline">DoorDash</a>
        </section>

        <main className="max-w-4xl mx-auto px-4 py-4 pb-28">
          {items.map(section=>(
            <div key={section.name} className="mb-6">
              <h2 className="text-lg font-extrabold tracking-wide mb-2">{section.name}</h2>
              <div className="grid grid-cols-2 gap-3">
                {section.items.map(i=>(
                  <div key={i.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{i.title}</div>
                      {i.price && <div className="text-sm opacity-70">${Number(i.price).toFixed(2)}</div>}
                    </div>
                    <button onClick={()=>add(i.id)} className="px-3 py-1.5 rounded-xl text-sm bg-amber-500 hover:bg-amber-600 text-white">Add</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>

        <footer className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-zinc-950/95 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold">Your Order</div>
              <div className="flex gap-2 text-xs">
                <button onClick={()=>setMode('pickup')} className={"px-2 py-1 rounded-full border " + (mode==='pickup'?'bg-emerald-600 text-white border-emerald-600':'border-zinc-300 dark:border-zinc-700')}>Pickup</button>
                <button onClick={()=>setMode('delivery')} className={"px-2 py-1 rounded-full border " + (mode==='delivery'?'bg-sky-600 text-white border-sky-600':'border-zinc-300 dark:border-zinc-700')}>Delivery</button>
              </div>
            </div>

            <div className="max-h-48 overflow-auto space-y-2">
              {Object.values(cart).length===0 && <div className="text-sm opacity-70">Your cart is empty. Add some items from the menu.</div>}
              {Object.entries(cart).map(([id,{item,qty}])=>(
                <div key={id} className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs opacity-70">${Number(item.price).toFixed(2)} × {qty}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={()=>dec(id)} className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700">–</button>
                    <div className="w-8 text-center text-sm">{qty}</div>
                    <button onClick={()=>add(id)} className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700">+</button>
                    <button onClick={()=>remove(id)} className="ml-2 text-xs underline opacity-70">remove</button>
                  </div>
                </div>
              ))}
            </div>

            <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder={mode==='pickup'?'Add pickup notes (e.g., no onions, extra chutney)':'Delivery notes (buzz code, leave at door, etc.)'} className="mt-3 w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"/>

            <div className="mt-3 flex items-end justify-between gap-3">
              <div className="text-sm">
                <div className="mb-1">Tip</div>
                <div className="flex gap-2">
                  {[0,10,12,15,18].map(p=>(
                    <button key={p} onClick={()=>setTipPct(p)} className={"px-2 py-1 rounded-full border text-xs "+(tipPct===p?'bg-amber-500 text-white border-amber-500':'border-zinc-300')}>{p}%</button>
                  ))}
                </div>
              </div>
              <div className="text-sm ml-auto space-y-0.5">
                <div className="flex justify-between gap-6"><span className="opacity-70">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between gap-6"><span className="opacity-70">GST (5%)</span><span>${(subtotal*0.05).toFixed(2)}</span></div>
                <div className="flex justify-between gap-6"><span className="opacity-70">Tip</span><span>${(subtotal*(tipPct/100)).toFixed(2)}</span></div>
                <div className="flex justify-between gap-6 font-bold text-base"><span>Total</span><span>${(subtotal+subtotal*0.05+subtotal*(tipPct/100)).toFixed(2)}</span></div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              {mode==='pickup' ? (<>
                <button onClick={checkout} className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-semibold">Checkout for Pickup</button>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STORE.address)}`} target="_blank" rel="noreferrer" className="w-full text-center rounded-2xl border border-emerald-600 text-emerald-700 py-3 font-semibold">Get Directions</a>
              </>) : (<>
                <a href={DELIVERY_LINKS.ubereats} target="_blank" rel="noreferrer" className="w-full rounded-2xl bg-sky-600 hover:bg-sky-700 text-white py-3 font-semibold text-center">Order on UberEats</a>
                <a href={DELIVERY_LINKS.doordash} target="_blank" rel="noreferrer" className="w-full rounded-2xl bg-red-600 hover:bg-red-700 text-white py-3 font-semibold text-center">Order on DoorDash</a>
              </>)}
            </div>

            {mode==='pickup' && (<div className="mt-4">
              <div className="text-xs opacity-70 mb-2">Pickup at: {STORE.address}</div>
              <div className="rounded-2xl overflow-hidden border border-zinc-200">
                <iframe title="map" width="100%" height="200" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(STORE.address)}&output=embed`} />
              </div>
            </div>)}
          </div>
        </footer>
      </div>
    </div>
  )
}
