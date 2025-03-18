import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Welcome to the American Express People Directory</h1>
      <p>Here you will get a chance to view our folks and learn more details about each one.</p>
      <p>
        Feel free to click{' '}
        <Link href="/people">
          <span className="text-amexBlue">Here</span>
        </Link>{' '}
        to explore or click -People- on the lefthand navigation
      </p>
    </div>
  )
}
