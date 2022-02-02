const listhelper = require('../utils/list_helper')

test('testing if blogs return 1', () => {
    const blogs = []
    const result = listhelper.dummy(blogs)

    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithMoreBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f7',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 15,
            __v: 0
        },
    ]

    test('when list has more than one blog', () => {
        const result = listhelper.totalLikes(listWithMoreBlogs)
        expect(result).toBe(30)
    })

    test('when list has one blog', () => {
        const result = listhelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when a list of blogs given, returns a the most likes', () => {
        const result = listhelper.favBlog(listWithMoreBlogs)
        expect(result).toEqual(listWithMoreBlogs[2])
    })
})