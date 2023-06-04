// import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'
import { utilService } from './util.service'

const REVIEW_KEY = 'review_db'


export const reviewService = {
  add,
  query,
  remove,
  getRandomReviews,
}

function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`review${queryStr}`)
  return storageService.query('review')
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await storageService.remove('review', reviewId)
}

async function add({ txt, aboutUserId }) {
  // const addedReview = await httpService.post(`review`, {txt, aboutUserId})

  const aboutUser = await userService.getById(aboutUserId)

  const reviewToAdd = {
    txt,
    byUser: userService.getLoggedinUser(),
    aboutUser: {
      _id: aboutUser._id,
      fullname: aboutUser.fullname,
      imgUrl: aboutUser.imgUrl
    }
  }

  reviewToAdd.byUser.score += 10
  await userService.update(reviewToAdd.byUser)
  const addedReview = await storageService.post('review', reviewToAdd)
  return addedReview
}

function getRandomReviews() {
  return _createRandomreviews()
}

function _createRandomreviews() {
  const reviews = []
  for (let i = 0; i < 5; i++) {
    reviews.push(_createRandomReview())
  }
  return reviews
}

function _createRandomReview() {
  return {
    id: utilService.makeId(),
    txt: utilService.makeLorem(50),
    rate: utilService.getRandomIntInclusive(1, 5),
    by: userService.getRandomUser(),
  }
}

; (() => {
  let reviews = utilService.loadFromStorage(REVIEW_KEY) || []
  if (!reviews.length) {
    reviews = _createRandomreviews()
    utilService.saveToStorage(REVIEW_KEY, reviews)
  }
})()