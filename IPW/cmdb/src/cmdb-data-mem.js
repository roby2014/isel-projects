// Module manages application data.
// In this specific module, data is stored in memory (groups (and some basic movies) + users)

// WARNING: changing data here may affect unit tests!

export const db_users = [
  { id: 11, name: 'Filipe', token: '3fa85f64-5717-4562-b3fc-2c963f66afa6' },
  { id: 12, name: 'Joao', token: '3fa85f64-5717-4562-b3fc-2c963f66afa7' },
  { id: 13, name: 'test', token: '123-123-123' }
]

export const db_movies = [
  {
    id: 1,
    name: 'James bond',
    duration: 90
  },
  {
    id: 2,
    name: '007',
    duration: 120
  },
  {
    id: 3,
    name: 'sei la filme',
    duration: 100
  }
]

export const db_groups = [
  {
    userId: 11,
    id: 1,
    name: 'aaa',
    description: 'abc',
    movies: [db_movies[0]]
  },
  {
    userId: 11,
    id: 2,
    name: 'ola',
    description: 'xd'
  },
  {
    userId: 12,
    id: 3,
    name: 'bdc',
    description: 'kola'
  },
  {
    userId: 11,
    id: 4,
    name: 'asdfasdfasdf',
    description: 'asdfasdfasfd'
  },
  {
    userId: 11,
    id: 5,
    name: 'aaa',
    description: 'aaa'
  }
]

// users

export async function isValidToken(token) {
  const user = db_users.find(u => u.token == token)
  return Promise.resolve(user != undefined ? true : false)
}

export async function getUserByToken(token) {
  return Promise.resolve(db_users.find(u => u.token == token))
}

export async function getUser(userId) {
  return Promise.resolve(db_users.find(it => it.id == userId))
}

export async function checkUserInfo(id, name) {
  return Promise.resolve(db_users.find(it => it.id == id && it.name == name))
}

export async function addUser(token, userId, name) {
  const user = await getUser(userId)
  if (user != undefined) {
    return -1 // already exists
  }

  const result = {
    id: userId,
    name: name,
    token: token
  }

  db_users.push(result)
  return Promise.resolve(result)
}

// groups

export async function getAllGroups() {
  return Promise.resolve(db_groups)
}

export async function getGroup(id, userId) {
  const obj = db_groups.find(it => it.id == id)
  if (obj == undefined) {
    return Promise.resolve(undefined)
  }

  obj['userId'] = userId
  return Promise.resolve(obj)
}

export async function createGroup(group) {
  const x = await db_groups.push(group)
  return Promise.resolve(group)
}

export async function updateGroup(id, newGroup, userId) {
  const idx = db_groups.findIndex(it => it.id == id && it.userId == userId)
  if (idx == -1) {
    return undefined
  }

  if (newGroup.id) db_groups[idx].id = newGroup.id
  if (newGroup.name) db_groups[idx].name = newGroup.name
  if (newGroup.description) db_groups[idx].description = newGroup.description
  if (newGroup.movies) db_groups[idx].movies = newGroup.movies

  return Promise.resolve(db_groups[idx])
}

export async function deleteGroup(id, userId) {
  const idx = db_groups.findIndex(
    group => group.id == id && group.userId == userId
  )
  if (idx == -1) {
    return undefined
  }

  const removed = db_groups.splice(idx, 1)
  if (removed == 0) {
    return undefined
  }

  return Promise.resolve(removed[0])
}

// movies

export async function getMovieWithId(id) {
  return Promise.resolve(db_movies.find(it => it.id == id))
}

export async function addMovieToGroup(groupId, movie, userId) {
  const group = await getGroup(groupId, userId)

  if (group.movies == undefined) {
    group.movies = [movie]
  } else {
    const findMovie = group.movies.find(it => it.id == movie.id)
    if (findMovie == undefined) group.movies.push(movie)
  }
  const result = await updateGroup(
    groupId,
    {
      id: group.id,
      name: group.name,
      description: group.description,
      userId: group.userId,
      movies: group.movies
    },
    group.userId
  )
  return Promise.resolve(result)
}

export async function removeMovieFromGroup(groupId, movie, userId) {
  const group = await getGroup(groupId, userId)
  const newGroup = {
    id: group.id,
    userId: group.userId,
    name: group.name,
    description: group.description,
    movies:
      group.movies != undefined
        ? group.movies.filter(it => it.id != movie.id)
        : []
  }

  const result = await updateGroup(groupId, newGroup, group.userId)
  return Promise.resolve(result)
}
