// components/VideoModal.jsx
'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaPlay } from 'react-icons/fa6';

export function VideoModal({video_url}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={"flex-c-m sizefull bo-cir bgwhite color1 hov1 trans-0-4"} variant="default"><FaPlay /></Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 aspect-video">
                <div className="w-full h-full relative">
                    <video controls className="w-full h-full">
                        <source src={video_url} type="video/mp4" />
                        Tarayıcınız video etiketini desteklemiyor.
                    </video>
                </div>
            </DialogContent>
        </Dialog>
    );
}
