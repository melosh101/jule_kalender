"use client"
import { useState } from 'react'
import { Card, CardContent } from "@/_components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/_components/ui/dialog"
interface CalendarDayProps {
  day: number
  message: string
  imageUrl: string
}

export function CalendarCard({ day, message, imageUrl }: CalendarDayProps) {
  const [isOpen, setIsOpen] = useState(false)



  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="h-24 cursor-pointer transition-all hover:scale-105 bg-red-100 dark:bg-red-900">
          <CardContent className="flex items-center justify-center h-full">
            <span className="text-2xl font-bold text-green-800 dark:text-green-200">{day}</span>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="min-h-screen min-w-screen max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>December {day}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-center">{message}</p>
          <a className='bg-green-600' href={'/challenge/' + day}>Go to challenge</a>
        </div>
      </DialogContent>
    </Dialog>
  )
}