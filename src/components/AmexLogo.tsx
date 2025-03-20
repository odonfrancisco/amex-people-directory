import Image from 'next/image'

export default function AmexLogo() {
  return (
    <div className={`flex flex-row items-center leading-none text-white`}>
      <Image src="/AMEX-Small.png" alt="Amex Logo Small" width="645" height="652" />
    </div>
  )
}
