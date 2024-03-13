import React from 'react'
import UserForm from './UserForm'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserData } from '../redux/actions/userActions'
import { useParams } from 'react-router-dom'

const CreateUser = () => {

  const { isUpdating, updatingError, users, isUpdatingSuccess } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const { id } = useParams()
  const user = users.find((item) => item._id === id);

  const updateUser = (data) => {
    dispatch(updateUserData({data, userId: id}))
  }

  return <UserForm userData={user} title="Update User" onSubmit={updateUser} isLoading={isUpdating} error={updatingError} type="update" isSuccess={isUpdatingSuccess} />
}

export default CreateUser
