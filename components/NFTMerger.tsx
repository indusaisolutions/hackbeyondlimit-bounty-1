"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import mergeImages from "merge-images"

export default function NFTMerger() {
  const [nft1, setNft1] = useState<string | null>(null)
  const [nft2, setNft2] = useState<string | null>(null)
  const [mergedNft, setMergedNft] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setNft: (value: string | null) => void) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNft(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const mergeNFTs = async () => {
    if (nft1 && nft2) {
      const merged = await mergeImages([nft1, nft2])
      setMergedNft(merged)
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="nft1">Upload NFT 1</Label>
          <Input id="nft1" type="file" onChange={(e) => handleFileUpload(e, setNft1)} accept="image/*" />
          {nft1 && (
            <div className="mt-2">
              <Image src={nft1 || "/placeholder.svg"} alt="NFT 1" width={200} height={200} />
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="nft2">Upload NFT 2</Label>
          <Input id="nft2" type="file" onChange={(e) => handleFileUpload(e, setNft2)} accept="image/*" />
          {nft2 && (
            <div className="mt-2">
              <Image src={nft2 || "/placeholder.svg"} alt="NFT 2" width={200} height={200} />
            </div>
          )}
        </div>
      </div>
      <Button onClick={mergeNFTs} disabled={!nft1 || !nft2} className="w-full mb-4">
        Merge NFTs
      </Button>
      {mergedNft && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Merged NFT</h2>
          <Image src={mergedNft || "/placeholder.svg"} alt="Merged NFT" width={400} height={400} />
        </div>
      )}
    </div>
  )
}

