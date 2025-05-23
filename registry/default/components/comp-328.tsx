"use client"

import { useId } from "react"
import { CreditCardIcon, WalletIcon } from "lucide-react"
import { usePaymentInputs } from "react-payment-inputs"
import images, { type CardImages } from "react-payment-inputs/images"

import { Button } from "@/registry/default/ui/button"
import { Checkbox } from "@/registry/default/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog"
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"

export default function Component() {
  const id = useId()
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Card details</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <WalletIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Update your card</DialogTitle>
            <DialogDescription className="text-left">
              Your new card will replace your current card.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`name-${id}`}>Name on card</Label>
              <Input id={`name-${id}`} type="text" required />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`number-${id}`}>Card Number</Label>
              <div className="relative">
                <Input
                  {...getCardNumberProps()}
                  id={`number-${id}`}
                  className="peer pe-9 [direction:inherit]"
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                  {meta.cardType ? (
                    <svg
                      className="overflow-hidden rounded-sm"
                      {...getCardImageProps({
                        images: images as unknown as CardImages,
                      })}
                      width={20}
                    />
                  ) : (
                    <CreditCardIcon size={16} aria-hidden="true" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`expiry-${id}`}>Expiry date</Label>
                <Input
                  className="[direction:inherit]"
                  {...getExpiryDateProps()}
                  id={`expiry-${id}`}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`cvc-${id}`}>CVC</Label>
                <Input
                  className="[direction:inherit]"
                  {...getCVCProps()}
                  id={`cvc-${id}`}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id={`primary-${id}`} />
            <Label
              htmlFor={`primary-${id}`}
              className="text-muted-foreground font-normal"
            >
              Set as default payment method
            </Label>
          </div>
          <Button type="button" className="w-full">
            Update card
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
