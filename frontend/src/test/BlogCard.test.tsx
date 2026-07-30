import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BlogCard from '../components/BlogCard'

// Skip the network entirely: force the loading spinner off.
vi.mock('../hooks', () => ({
  useBlog: () => ({ loading: false, blog: undefined }),
}))

describe('BlogCard', () => {
  it('renders title, author, formatted date and read time', () => {
    render(
      <MemoryRouter>
        <BlogCard
          id="1"
          authorName="Manak"
          title="My First Blog"
          content={'a'.repeat(400)}          // 400 chars → ceil(400/200) = "2 min read"
          publishedDate="2026-07-30T10:00:00.000Z"
        />
      </MemoryRouter>
    )

    expect(screen.getByText('My First Blog')).toBeInTheDocument()
    expect(screen.getByText('Manak')).toBeInTheDocument()
    expect(screen.getByText('2 min read')).toBeInTheDocument()
    expect(screen.getByText('30 July, 2026')).toBeInTheDocument()
  })
})