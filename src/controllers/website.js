import { getItemByIdDb } from '../domains/item.js'
import { getUserByIdDb } from '../domains/user.js'
import {
  createWebsiteDb,
  deleteWebsiteByIdDb,
  getAllWebsitesDb,
  getWebsiteByIdDb,
} from '../domains/website.js'
import { BadRequestError, NotFoundError } from '../errors/ApiError.js'

const getAllWebsites = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const user = await getUserByIdDb(userId)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const websites = await getAllWebsitesDb(userId)

  return res.json({
    websites,
  })
}

const createWebsite = async (req, res) => {
  const { userId, itemId, url } = req.body

  if (!userId || !itemId || !url) {
    throw new BadRequestError('Missing fields in request body')
  }

  const user = await getUserByIdDb(userId)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const itemFound = await getItemByIdDb(userId, itemId)

  if (!itemFound) {
    throw new NotFoundError('Item not found')
  }

  const website = await createWebsiteDb(userId, itemId, url)

  return res.status(201).json({
    website,
  })
}

const deleteWebsiteById = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    throw new BadRequestError('Missing fields in request body')
  }

  const websiteId = Number(req.params.id)

  const idFound = await getWebsiteByIdDb(userId, websiteId)

  if (!idFound) {
    throw new NotFoundError('Website not found')
  }

  const website = await deleteWebsiteByIdDb(userId, websiteId)

  return res.json({
    website,
  })
}

export { getAllWebsites, createWebsite, deleteWebsiteById }
