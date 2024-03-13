import React, { useEffect } from 'react'
import UserForm from './UserForm'
import { useDispatch, useSelector } from 'react-redux'
import { createUserData } from '../redux/actions/userActions'

const CreateUser = () => {

  const { isCreating, creatingError, isCreatingSuccess } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const createUser = (data) => {
    dispatch(createUserData(data))
  }

  return <UserForm title="Create User" onSubmit={createUser} isLoading={isCreating} error={creatingError} type="create" isSuccess={isCreatingSuccess} />
}

export default CreateUser
