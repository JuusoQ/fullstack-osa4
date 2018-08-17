const dummy = (blogs) => {
    return 1
}

const sum = (acc, curr) => acc+curr

const totalLikes = (blogs) => {

    return blogs.map(b=>b.likes).reduce(sum,0)    
}

const favoriteBlog = (blogs) => {
    // assume that blogs is list of objects

    if (blogs.length === 0) {
        return {}
    } else {
        let mostLikes = blogs.map(b => b.likes).reduce((a,b)=>{
            return Math.max(a,b)
        })

        let indexOfMostPopular = blogs.map(a => a.likes).indexOf(mostLikes)
        return blogs[indexOfMostPopular]
    }
}

module.exports = {
    dummy,
    favoriteBlog,
    totalLikes
}