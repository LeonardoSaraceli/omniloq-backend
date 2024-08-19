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
  const { id } = req.user

  const user = await getUserByIdDb(id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const websites = await getAllWebsitesDb(id)

  return res.json({
    websites,
  })
}

const createWebsite = async (req, res) => {
  const { id } = req.user

  const { itemId, url } = req.body

  if (!itemId || !url) {
    throw new BadRequestError('Missing fields in request body')
  }

  const user = await getUserByIdDb(id)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const itemFound = await getItemByIdDb(id, itemId)

  if (!itemFound) {
    throw new NotFoundError('Item not found')
  }

  const website = await createWebsiteDb(id, itemId, url)

  return res.status(201).json({
    website,
  })
}

const deleteWebsiteById = async (req, res) => {
  const { id } = req.user

  const websiteId = Number(req.params.id)

  const idFound = await getWebsiteByIdDb(id, websiteId)

  if (!idFound) {
    throw new NotFoundError('Website not found')
  }

  const website = await deleteWebsiteByIdDb(id, websiteId)

  return res.json({
    website,
  })
}

export { getAllWebsites, createWebsite, deleteWebsiteById }
