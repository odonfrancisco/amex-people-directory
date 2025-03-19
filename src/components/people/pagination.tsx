import Link from 'next/link'

import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
} from '@heroicons/react/24/outline'

const navButtons = [
  {
    condition: (currentPage: number) => currentPage > 1,
    href: () => '/people?page=1',
    icon: ChevronDoubleLeftIcon,
    key: 'first',
  },
  {
    condition: (currentPage: number) => currentPage > 1,
    href: (currentPage: number) => `/people?page=${currentPage - 1}`,
    icon: ChevronLeftIcon,
    key: 'prev',
  },
  {
    href: (currentPage: number) => `/people?page=${currentPage + 1}`,
    icon: ChevronRightIcon,
    key: 'next',
  },
]

export default function Pagination({ currentPage }: { currentPage: number }) {
  const paginationButtons = navButtons.map(({ condition, href, icon, key }) => {
    if (condition && !condition(currentPage)) return <></>
    const LinkIcon = icon

    return (
      <Link href={href(currentPage)} key={key}>
        <LinkIcon className="w-6" />
      </Link>
    )
  })

  return (
    <>
      <div className="flex box-border bg-gray-50 justify-end">{paginationButtons}</div>
    </>
  )
}
