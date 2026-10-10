import React, { useState } from 'react'
import { DISHES, CATEGORIES } from '../data/dishes'
import { Plus, Minus, Check, Star, Clock, Flame, Search, ShoppingBag } from 'lucide-react'

export function Menu({ cart, onAddToCart, onUpdateQuantity, onOpenOrderForm }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDishes = DISHES.filter(dish => {
    const matchesCategory = selectedCategory === 'All' || dish.category === selectedCategory
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getDishQuantityInCart = (dishId) => {
    const item = cart.find(i => i.id === dishId)
    return item ? item.quantity : 0
  }

  return (
    <section id="menu" className="py-16 sm:py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <span>Part A Requirement · 6+ Dishes Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
            Our Handcrafted Delicacies
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Every dish is prepared freshly with traditional earthen tandoors, natural wood charcoal, and authentic royal spices. Pick your dishes and order now!
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-neutral-800/80">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDishes.map(dish => {
            const quantityInCart = getDishQuantityInCart(dish.id)

            return (
              <div
                key={dish.id}
                className="group rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col shadow-lg hover:shadow-amber-500/5 hover:-translate-y-1"
              >
                {/* Dish Image */}
                <div className="relative h-48 w-full overflow-hidden bg-neutral-800">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent"></div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-amber-300 border border-neutral-700">
                    {dish.tag}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-medium text-neutral-300">
                    {dish.category}
                  </div>

                  {/* Price overlay on image corner */}
                  <div className="absolute bottom-3 left-3 flex items-baseline gap-1">
                    <span className="text-xl font-black text-amber-400 drop-shadow">
                      Rs. {dish.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-neutral-300 uppercase">PKR</span>
                  </div>
                </div>

                {/* Dish Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors line-clamp-1 font-serif">
                        {dish.name}
                      </h3>
                    </div>

                    {/* Metadata line */}
                    <div className="flex items-center gap-3 text-xs text-neutral-400 mb-2.5">
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {dish.rating}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {dish.prepTime}
                      </span>
                      {dish.spicyLevel > 0 && (
                        <>
                          <span>·</span>
                          <span className="flex items-center gap-0.5 text-red-400" title={`Spicy level: ${dish.spicyLevel}`}>
                            <Flame className="w-3 h-3" />
                            {'🌶️'.repeat(dish.spicyLevel)}
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                      {dish.description}
                    </p>
                  </div>

                  {/* Add / Quantity Controls */}
                  <div className="pt-3 border-t border-neutral-800/80">
                    {quantityInCart === 0 ? (
                      <button
                        onClick={() => onAddToCart(dish)}
                        className="w-full py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add to Order</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between bg-neutral-950 p-1.5 rounded-xl border border-amber-500/40">
                        <button
                          onClick={() => onUpdateQuantity(dish.id, quantityInCart - 1)}
                          className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-black text-amber-400">
                            {quantityInCart} in order
                          </span>
                          <span className="text-[10px] text-neutral-400">
                            Rs. {(dish.price * quantityInCart).toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => onUpdateQuantity(dish.id, quantityInCart + 1)}
                          className="w-8 h-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center justify-center font-bold transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Floating Quick Checkout Bar if items selected */}
        {cart.length > 0 && (
          <div className="mt-12 p-4 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-800 border border-amber-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-black">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Your Current Selection</p>
                <p className="text-base font-bold text-white">
                  {cart.reduce((s, i) => s + i.quantity, 0)} items · <span className="text-amber-400 font-black">Rs. {cart.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()} PKR</span>
                </p>
              </div>
            </div>

            <button
              onClick={onOpenOrderForm}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-sm uppercase tracking-wider transition shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
            >
              Proceed to Order Form &rarr;
            </button>
          </div>
        )}

      </div>
    </section>
  )
}

