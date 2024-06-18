/* eslint-disable react-hooks/exhaustive-deps */
import { useDebouncedCallback } from 'use-debounce'
import { useVaultStore, Vault } from '../shares/stores/useVaultStore'
import React, { useEffect, useState } from 'react'
import { CATEGORIES } from './constants'

export const useSearch = () => {
  const { vault } = useVaultStore()

  const [categorie, setCategorie] = useState(CATEGORIES[0])
  const [passwordsFiltered, setPasswordsFiltered] = useState<Vault[]>([])

  const debounced = useDebouncedCallback(
    (value) => {
      handleSearch(value)
    },
    400
  )

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value
    const passwords = vault.filter((password) => password.website.includes(search))
    const filteredByCategory = await categorie.filter({ passwords })
    setPasswordsFiltered(filteredByCategory)
  }

  useEffect(() => {
    const initialPasswords = async () => {
      const passwords = await categorie.filter({ passwords: vault })
      setPasswordsFiltered(passwords)
    }

    initialPasswords()
  }, [categorie])

  return {
    categorie,
    setCategorie,
    debounced,
    passwordsFiltered
  }
}
