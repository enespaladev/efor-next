"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, X, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"

export default function VideoModal({ video_url }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
    setIsPlaying(true);
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsPlaying(false)
    document.body.style.overflow = "unset"
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div>
      {/* Trigger Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group cursor-pointer"
        onClick={openModal}>
        <div className="overflow-hidden rounded-full ">
          <img
            src="https://preview-modern-video-modal-kzmjkwe3prmtouhywnrp.vusercontent.net/placeholder.svg?height=300&width=500"
            alt="Video Thumbnail"
            className="w-[100%] h-[100%] object-cover transition-transform duration-500 group-hover:scale-110" />
          {/* <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" /> */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <div
              className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-8 h-8 text-slate-800 ml-1" fill="currentColor" />
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl ${isFullscreen ? "w-full h-full" : "max-w-4xl w-full aspect-video"
                }`}
              onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10  backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                <X className="w-5 h-5" />
              </motion.button>

              {/* Video Container */}
              <div className="relative w-full h-full group">
                <video
                  autoPlay
                  className="w-full h-full object-cover"
                  poster="/placeholder.svg?height=600&width=1000"
                  muted={isMuted}
                  loop
                  playsInline
                  ref={(video) => {
                    if (video) {
                      if (isPlaying) {
                        video.play()
                      } else {
                        video.pause()
                      }
                    }
                  }}>
                  <source
                    src={video_url}
                    type="video/mp4" />
                </video>

                {/* Video Controls Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Center Play Button */}
                  {!isPlaying && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                      </div>
                    </motion.button>
                  )}

                  {/* Bottom Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={togglePlay}
                          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                          {isPlaying ? (
                            <div className="w-4 h-4 flex space-x-1">
                              <div className="w-1.5 h-4 bg-white rounded-sm" />
                              <div className="w-1.5 h-4 bg-white rounded-sm" />
                            </div>
                          ) : (
                            <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                          )}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleMute}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </motion.button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleFullscreen}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                      </motion.button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: isPlaying ? "100%" : "0%" }}
                          transition={{ duration: 30, ease: "linear" }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Video Info */}
              <div className="absolute top-4 left-4 text-white">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
