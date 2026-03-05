"use client";

import { cn } from "../../lib/utils";
import { MapPin, Wifi, Wind, Coffee, ArrowRight, Star } from 'lucide-react';

function DisplayCard({ className, property }) {
  return (
    <div
      className={cn(
        "relative flex h-[26rem] w-[20rem] md:w-[22rem] -skew-y-[8deg] select-none flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0A1128] px-5 py-5 transition-all duration-700 transform-gpu will-change-transform after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-[#070B19] after:to-transparent after:content-[''] hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(45,212,191,0.15)] cursor-pointer group",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden shrink-0 rounded-2xl mb-4">
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white bg-black/80 border border-white/10">
          {property.type}
        </div>
        <div className="absolute top-4 right-4 z-10 px-2 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 bg-black/80 border border-white/10">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          {property.rating}
        </div>
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent opacity-90"></div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow relative z-10">
        <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors mb-1 truncate">
          {property.title}
        </h3>
        
        <p className="text-slate-400 text-sm flex items-center gap-1 mb-4">
          <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
          <span className="truncate">{property.location}</span>
        </p>

        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-4 text-slate-300 flex-wrap">
            <div className="flex items-center gap-1 text-[10px] bg-white/5 px-2 py-1 rounded-lg">
              <Wifi className="w-3 h-3 text-teal-400" /> Wi-Fi
            </div>
            <div className="flex items-center gap-1 text-[10px] bg-white/5 px-2 py-1 rounded-lg">
              <Wind className="w-3 h-3 text-teal-400" /> AC
            </div>
            <div className="flex items-center gap-1 text-[10px] bg-white/5 px-2 py-1 rounded-lg">
              <Coffee className="w-3 h-3 text-teal-400" /> Pantry
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-white/5">
            <div>
              <span className="text-2xl font-bold text-white">{property.price}</span>
              <span className="text-xs text-slate-500">{property.period}</span>
            </div>
            <button className="p-2 rounded-full bg-teal-500/10 text-teal-400 group-hover:bg-teal-500 group-hover:text-[#070B19] transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DisplayCards({ cards }) {
  return (
    // LOGIC CHANGE: Reduced top padding to pt-4 and bottom padding to pb-40 
    // to crush the invisible walls causing the dead space.
    <div className="flex w-full justify-center pt-4 pb-40">
      <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
        {cards.map((cardProps, index) => (
          <DisplayCard key={index} {...cardProps} />
        ))}
      </div>
    </div>
  );
}