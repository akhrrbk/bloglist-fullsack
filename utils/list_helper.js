const dummy = (blogs) => {
    return 1
}

const totalLikes = (listWithOneBlog) => {
    if(listWithOneBlog.length === 1){
        return listWithOneBlog[0].likes
    } else if(listWithOneBlog.length > 1){
        var total = listWithOneBlog.reduce((sum, value) => {
            return sum + value.likes
        }, 0)
        return total
    }
}

const favBlog = (listofblogs) => {
    const like = listofblogs.map(per => per.likes)
    const likes = listofblogs.filter(per => per.likes === Math.max(...like))
    return likes[0]
}

module.exports = {
    dummy,
    totalLikes,
    favBlog
}