import Image from 'next/image'

// import { lusitana } from '@/app/ui/fonts'

export default function AmexLogo() {
  return (
    <div className={`flex flex-row items-center leading-none text-white`}>
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <Image src="/AMEX-Small.png" alt="Amex Logo Small" width="645" height="652" />
    </div>
  )
}
