import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface TicketStubProps {
  eventImage: string;
  eventName: string;
  eventLocation: string;
  eventDate: string;
  attendeeName: string;
  ticketType: string;
  ticketPrice?: number;
  ticketCode: string;
  className?: string;
}

export default function TicketStub({
  eventImage,
  eventName,
  eventLocation,
  eventDate,
  attendeeName,
  ticketType,
  ticketPrice,
  ticketCode,
  className = ""
}: TicketStubProps) {
  return (
    <div className={`print-ticket bg-white text-zinc-900 rounded-xl overflow-hidden shadow-2xl relative flex flex-col font-sans select-none border border-green-700 ${className}`}>
      {/* Event Photo Header */}
      <div className="relative h-28 w-full bg-zinc-800">
        <img
          src={eventImage}
          alt={eventName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
        <div className="absolute bottom-2 left-0 w-full text-center px-4">
          <h5 className="text-white font-sans font-bold text-base leading-tight truncate">
            {eventName}
          </h5>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-5 space-y-4 bg-white text-left">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div>
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-0.5">
              Location
            </span>
            <span className="text-xs font-bold text-zinc-800 block truncate">
              {eventLocation}
            </span>
          </div>
          <div>
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-0.5">
              Date
            </span>
            <span className="text-xs font-bold text-zinc-800 block truncate">
              {eventDate}
            </span>
          </div>
          <div>
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-0.5">
              Attendee
            </span>
            <span className="text-xs font-bold text-zinc-800 block truncate">
              {attendeeName}
            </span>
          </div>
          <div>
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-0.5">
              Admission
            </span>
            <span className="text-xs font-bold text-green-600 block truncate">
              {ticketType === "paid" && ticketPrice
                ? `Paid (₦${ticketPrice.toLocaleString()})`
                : "Free Entrance"}
            </span>
          </div>
        </div>
      </div>

      {/* Notch Divider */}
      <div className="relative flex items-center justify-between bg-white h-6 overflow-hidden">
        <div className="w-3 h-6 bg-[#020402] rounded-r-full absolute left-0 -translate-x-1/2 border-r border-zinc-200"></div>
        <div className="flex-1 border-t border-dashed border-zinc-300 mx-4"></div>
        <div className="w-3 h-6 bg-[#020402] rounded-l-full absolute right-0 translate-x-1/2 border-l border-zinc-200"></div>
      </div>

      {/* QR Code Section */}
      <div className="bg-white px-5 pb-5 pt-1 flex flex-col items-center justify-center space-y-3">
        {/* Vector QR Code with Logo at Center */}
        <div className="p-2 border border-zinc-100 rounded-xl bg-zinc-50 shadow-inner flex items-center justify-center">
          <QRCodeSVG
            value={ticketCode}
            size={110}
            level="H"
            includeMargin={false}
            imageSettings={{
              src: "/logo.png",
              height: 22,
              width: 22,
              excavate: true,
            }}
          />
        </div>

        <div className="text-center">
          <span className="text-[10px] font-mono font-bold text-zinc-950 tracking-[0.2em] block">
            {ticketCode}
          </span>
          <span className="text-[8px] font-black tracking-widest text-zinc-400 block uppercase mt-1">
            Scan QR Code at Entrance
          </span>
        </div>

        {/* Brand Footnote */}
        <div className="pt-2.5 border-t border-zinc-100 w-full flex items-center justify-center gap-1.5 opacity-60 mt-1.5">
          <img
            src="/logo.png"
            alt="Visit Arewa Logo"
            className="w-3.5 h-3.5 object-contain opacity-80"
          />
          <span className="text-[7px] font-black uppercase tracking-[0.15em] text-zinc-500">
            Created on Visit Arewa
          </span>
        </div>
      </div>
    </div>
  );
}
