'use strict'
import { Entry } from '@prisma/client'
import { server } from '../src/server'
import prisma from '../src/db'
import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

/*
jest.mock('../src/db', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
    mockReset(prisma)
})*/

test('Returning no entries works', async () => {
    const app = server

    const response = await app.inject({ method: 'GET', url: '/get/' })

    expect(response.statusCode).toEqual(200)
})

test('Creating an entry works', async () => {
    const app = server

    const response = await app.inject({
        method: 'POST',
        url: '/create/',
        payload: {
            title: "Shopping",
            description: "Eating",
            created_at: new Date(),
            scheduled_date: new Date()
        }
    })

    expect(response.statusCode).toEqual(200)
})

test('Getting an entry works', async () => {
    const app = server

    const date = new Date();

    const postResponse = await app.inject({
        method: 'POST',
        url: '/create/',
        payload: {
            title: "Shopping",
            description: "Eating",
            created_at: date,
            scheduled_date: date
        }
    })

    expect(postResponse.statusCode).toEqual(200)
    const postResponseJSON = postResponse.json()
    const postResponseID = postResponseJSON.id

    const getResponse = await app.inject({
        method: 'GET',
        url: '/get/' + postResponseID
    })

    const getResponseJSON = getResponse.json()[0]
    const getResponseLength = getResponseJSON.length
    const getResponseTitle = getResponseJSON.title
    const getResponseDescription = getResponseJSON.description
    const getResponseCreatedAt = new Date(getResponseJSON.created_at)
    const getResponseScheduledDate = new Date(getResponseJSON.scheduled_date)

    expect(getResponseLength).not.toEqual(0)
    expect(getResponseTitle).toMatch("Shopping")
    expect(getResponseDescription).toMatch("Eating")
    expect(getResponseCreatedAt).toMatchObject(date)
    expect(getResponseScheduledDate).toMatchObject(date)
    expect(getResponse.statusCode).toEqual(200)
})

test('Deleting an entry works', async () => {
    const app = server

    const date = new Date();

    const postResponse = await app.inject({
        method: 'POST',
        url: '/create/',
        payload: {
            title: "Shopping",
            description: "Eating",
            created_at: date,
            scheduled_date: date
        }
    })

    const postResponseJSON = postResponse.json()
    const postResponseID = postResponseJSON.id

    const deleteResponse = await app.inject({
        method: 'DELETE',
        url: '/delete/' + postResponseID,
    })

    //Check length of entries here?
    expect(deleteResponse.statusCode).toEqual(200)
})

test('Updating an entry works', async () => {
    const app = server

    const firstTitle = "Shopping"
    const firstDescription = "Eating"
    const firstDate = new Date();

    const postResponse = await app.inject({
        method: 'POST',
        url: '/create/',
        payload: {
            title: firstTitle,
            description: firstDescription,
            created_at: firstDate,
            scheduled_date: firstDate
        }
    })

    expect(postResponse.statusCode).toEqual(200)
    const postResponseJSON = postResponse.json()
    const postResponseID = postResponseJSON.id

    var firstGetResponse = await app.inject({
        method: 'GET',
        url: '/get/' + postResponseID
    })

    const firstGetResponseJSON = firstGetResponse.json()[0]
    const firstGetResponseLength = firstGetResponseJSON.length
    const firstGetResponseTitle = firstGetResponseJSON.title
    const firstGetResponseDescription = firstGetResponseJSON.description
    const firstGetResponseCreatedAt = new Date(firstGetResponseJSON.created_at)
    const firstGetResponseScheduledDate = new Date(firstGetResponseJSON.scheduled_date)

    expect(firstGetResponseLength).not.toEqual(0)
    expect(firstGetResponseTitle).toMatch(firstTitle)
    expect(firstGetResponseDescription).toMatch(firstDescription)
    expect(firstGetResponseCreatedAt).toMatchObject(firstDate)
    expect(firstGetResponseScheduledDate).toMatchObject(firstDate)
    expect(firstGetResponse.statusCode).toEqual(200)

    const secondTitle = "Sleeping"
    const secondDescription = "Drinking"
    const secondDate = new Date();

    const updateResponse = await app.inject({
        method: 'PUT',
        url: '/update/' + postResponseID,
        payload: {
            title: secondTitle,
            description: secondDescription,
            created_at: secondDate,
            scheduled_date: secondDate
        }
    })

    expect(updateResponse.statusCode).toEqual(200)

    const secondGetResponse = await app.inject({
        method: 'GET',
        url: '/get/' + postResponseID
    })

    const secondGetResponseJSON = secondGetResponse.json()[0]
    const secondGetResponseLength = secondGetResponseJSON.length
    const secondGetResponseTitle = secondGetResponseJSON.title
    const secondGetResponseDescription = secondGetResponseJSON.description
    const secondGetResponseCreatedAt = new Date(secondGetResponseJSON.created_at)
    const secondGetResponseScheduledDate = new Date(secondGetResponseJSON.scheduled_date)

    expect(secondGetResponseLength).not.toEqual(0)
    expect(secondGetResponseTitle).toMatch(secondTitle)
    expect(secondGetResponseDescription).toMatch(secondDescription)
    expect(secondGetResponseCreatedAt).toMatchObject(secondDate)
    expect(secondGetResponseScheduledDate).toMatchObject(secondDate)
    expect(secondGetResponse.statusCode).toEqual(200)
})