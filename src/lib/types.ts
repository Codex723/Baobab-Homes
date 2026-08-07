export type Mode = 'buy' | 'rent'

export interface Listing {
  id: string; title: string; address: string; suburb: string
  price: number; type: 'sale' | 'rent'
  beds: number; baths: number; sqm: number; parking: number
  furnished: boolean; img: string; gallery: string[]
  verified: boolean; tag: string | null; agentId: string
  ref: string; listed: string; desc: string
  amenities: string[]; kind: string
  lat: number; lng: number // real coordinates, used on the live map
}

export interface Agent {
  id: string; name: string; role: string; office: string
  lic: string; phone: string; email: string; img: string
  bio: string
}
