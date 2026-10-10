import React, { useState, useEffect } from 'react'
import { SOCIAL_SCHEDULE } from '../data/socialSchedule'
import {
  Clock,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  CheckCircle2,
  Calendar,
  Sparkles,
  Bot,
  Zap,
  Info
} from 'lucide-react'
import { Instagram, Facebook } from './Icons'

export function SocialScheduler() {
  const [scheduleList, setScheduleList] = useState(SOCIAL_SCHEDULE)
  const [autoEngineActive, setAutoEngineActive] = useState(true)
  const [currentTimePKT, setCurrentTimePKT] = useState('')
  const [activePlatform, setActivePlatform] = useState('instagram') // 'instagram' | 'facebook' | 'table'

  // Live Pakistan Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const pktString = now.toLocaleTimeString('en-PK', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setCurrentTimePKT(pktString)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSimulatePost = (id) => {
    setScheduleList(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === 'Auto-Posted' ? 'Scheduled' : 'Auto-Posted',
        }
      }
      return item
    }))
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner with Pakistan Time & Cron Engine */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border border-amber-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>Part B Task 7 · Social Media That Posts by Itself (20 Marks)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
            Autonomous Social Media Scheduler
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Automatically posts 3 pictures and 1 reel to the restaurant’s Instagram and Facebook pages at peak appetite hours (Pakistan Time).
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-neutral-950/80 p-4 rounded-2xl border border-neutral-800">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 block">Current Pakistan Time (PKT)</span>
            <span className="text-xl font-black text-amber-400 font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              {currentTimePKT || '12:30:00 PM PKT'}
            </span>
          </div>

          <div className="border-t sm:border-t-0 sm:border-l border-neutral-800 pt-2 sm:pt-0 sm:pl-4">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Autonomous Daemon</span>
            <button
              onClick={() => setAutoEngineActive(!autoEngineActive)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                autoEngineActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{autoEngineActive ? 'Bot Active (Auto-Post ON)' : 'Bot Paused'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          THE EXACT HACKATHON SCHEDULE TABLE (Required for Screenshot Submission)
          ========================================================================= */}
      <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 bg-neutral-950/70 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Required Hackathon 4-Times Schedule Matrix
            </h3>
          </div>
          <span className="text-xs text-amber-400 font-medium">
            Screenshot Ready for Submission · Pakistan Time
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-emerald-950/40 text-emerald-300 border-b border-neutral-800 uppercase tracking-wider text-[11px] font-bold">
              <tr>
                <th className="py-3.5 px-4">Day</th>
                <th className="py-3.5 px-4">What (Type &amp; Subject)</th>
                <th className="py-3.5 px-4">Time (Pakistan)</th>
                <th className="py-3.5 px-4">Why (Strategic Rationale)</th>
                <th className="py-3.5 px-4">Auto-Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {scheduleList.map(item => (
                <tr key={item.id} className="hover:bg-neutral-800/40 transition">
                  <td className="py-3.5 px-4 font-black text-amber-400 font-mono">
                    {item.day}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white block">{item.topic}</span>
                    <span className="text-neutral-400 text-[11px]">{item.title}</span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-white font-mono bg-neutral-950/40">
                    <span className="px-2.5 py-1 rounded-md bg-neutral-800 border border-neutral-700 text-amber-300">
                      {item.time}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-300 italic">
                    "{item.why}"
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      item.status === 'Auto-Posted'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Auto-Posted' ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`}></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleSimulatePost(item.id)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-medium border border-neutral-700 transition cursor-pointer"
                    >
                      {item.status === 'Auto-Posted' ? 'Revert to Queued' : 'Simulate Auto-Post'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          VISUAL PREVIEW: 3 POSTS (PICTURES) + 1 REEL FROM DISHES
          ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white font-serif">
              Visual Feed Preview: 3 Posts + 1 Reel
            </h3>
            <p className="text-xs text-neutral-400">
              High-resolution food media prepared from restaurant dishes with captions and timing badges.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs">
            <button
              onClick={() => setActivePlatform('instagram')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                activePlatform === 'instagram' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400'
              }`}
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </button>
            <button
              onClick={() => setActivePlatform('facebook')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                activePlatform === 'facebook' ? 'bg-blue-600 text-white' : 'text-neutral-400'
              }`}
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook</span>
            </button>
          </div>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scheduleList.map(item => (
            <div
              key={item.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition group"
            >
              {/* Card Top: Timing & Day Pill */}
              <div className="p-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
                <span className="font-mono text-xs font-black text-amber-400">
                  {item.day} · {item.time}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-semibold">
                  {item.mediaType === 'reel' ? '🎥 1 Reel' : '📸 1 Picture'}
                </span>
              </div>

              {/* Media Container */}
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Reel Play Overlay if reel */}
                {item.mediaType === 'reel' && (
                  <div className="absolute inset-0 bg-neutral-950/40 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-neutral-950/80 text-[10px] font-bold text-white font-mono">
                      0:34
                    </span>
                  </div>
                )}

                {/* Status Watermark */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md border ${
                    item.status === 'Auto-Posted'
                      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40'
                      : 'bg-neutral-950/90 text-amber-300 border-amber-500/40'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Social Interactions */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-neutral-400 mb-2">
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4 hover:text-red-500 cursor-pointer" />
                      <MessageCircle className="w-4 h-4 hover:text-white cursor-pointer" />
                      <Share2 className="w-4 h-4 hover:text-white cursor-pointer" />
                    </div>
                    <Bookmark className="w-4 h-4 hover:text-white cursor-pointer" />
                  </div>

                  <p className="text-[11px] font-bold text-neutral-300 mb-1">
                    {item.likes} likes · {item.comments} comments
                  </p>

                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    <strong className="text-white">zaikaroyale.pk</strong> {item.caption}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.hashtags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[10px] text-blue-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 bg-neutral-950/40 -mx-4 -mb-4 p-3 rounded-b-2xl">
                  <span className="text-[10px] text-amber-400 uppercase font-bold block">Reasoning:</span>
                  <span>{item.why}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
