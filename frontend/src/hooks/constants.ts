import { Vault } from '../shares/types'

async function getCurrentTab () {
  const queryOptions = { active: true, lastFocusedWindow: true }
  const [tab] = await chrome?.tabs?.query(queryOptions) ?? []
  return tab
}

const filterFavorites = async ({
  passwords
}: {
        passwords: Vault[]
      }) => {
  const filtered = passwords.filter((password) => password.favorite)
  return filtered
}

const filterAll = async ({
  passwords
}: {
        passwords: Vault[]
      }) => {
  return passwords
}

const filterRelevant = async ({
  passwords
}: {
        passwords: Vault[]
      }) => {
  let url

  if (
    typeof chrome !== 'undefined' &&
          chrome?.runtime &&
          chrome?.runtime.id
  ) {
    const tab = await getCurrentTab()
    url = tab?.url
  } else {
    url = location.href
  }

  if (!url) return passwords

  const website = new URL(url).origin
  const filtered = passwords.filter((password) => password.website === website)
  return filtered
}

export const CATEGORIES = [{
  id: 1,
  name: 'Relevantes',
  filter: filterRelevant
},
{
  id: 2,
  name: 'Favoritos',
  filter: filterFavorites
},
{
  id: 3,
  name: 'Todos',
  filter: filterAll
}
]
