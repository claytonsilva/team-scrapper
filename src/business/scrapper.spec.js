import { throwCustomError } from '../utils/errors'

/** mock error generation to validate signature */
jest.mock('../utils/errors')

throwCustomError.mockImplementation((error) => {
  throw error
})

// describe('validateCreateTodo', () => {
//   const methodPath = 'business.todo.validateCreateTodo'
//   const validateCaseDefault = {
//     taskDescription: 'test'
//   }

//   test('validate default case', () => {
//     expect(validateCreateTodo(validateCaseDefault, 'testUser')).toMatchObject({
//       ...validateCaseDefault,
//       taskStatus: ETodoStatus.NEW,
//       taskOwner: 'testUser',
//       taskPriority: EPriority.LOW,
//       taskOrder: 0
//     })
//   })

//   const validateCasePriorityInvalid = {
//     taskOrder: 1,
//     taskDescription: 'test',
//     taskPriority: 'INVALID'
//   }

//   test('validate invalid taskPriority', () => {
//     const throwMessage = `invalid value for priority: got ${validateCasePriorityInvalid.taskPriority}`
//     expect(() => {
//       validateCreateTodo(validateCasePriorityInvalid, 'testUser')
//     }).toThrow(throwMessage)
//     // throws correct message
//     expect(throwCustomError).toHaveBeenCalledWith(new Error(throwMessage), methodPath, EClassError.USER_ERROR)
//   })

//   const validateCaseStatusInvalid = {
//     taskOrder: 1,
//     taskDescription: 'test',
//     taskStatus: 'INVALID'
//   }

//   test('validate invalid taskStatus on create', () => {
//     const throwMessage = `invalid value for status: got ${validateCaseStatusInvalid.taskStatus}`
//     expect(() => {
//       validateCreateTodo(validateCaseStatusInvalid, 'testUser')
//     }).toThrow(throwMessage)
//     // throws correct message
//     expect(throwCustomError).toHaveBeenCalledWith(new Error(throwMessage), methodPath, EClassError.USER_ERROR)
//   })

//   const validateNullDescription = {
//     taskOrder: 1
//   }

//   test('validate null description on create', () => {
//     const throwMessage = 'invalid entry on field data, missing information about taskDescription'
//     expect(() => {
//       validateCreateTodo(validateNullDescription, 'testUser')
//     }).toThrow(throwMessage)
//     // throws correct message
//     expect(throwCustomError).toHaveBeenCalledWith(new Error(throwMessage), methodPath, EClassError.USER_ERROR)
//   })

//   const validateNullData = null

//   test('validate null data on create', () => {
//     const throwMessage = 'invalid entry on field data, missing information'
//     expect(() => {
//       validateCreateTodo(validateNullData, 'testUser')
//     }).toThrow(throwMessage)
//     // throws correct message
//     expect(throwCustomError).toHaveBeenCalledWith(new Error(throwMessage), methodPath, EClassError.USER_ERROR)
//   })

//   test('validate null user on create', () => {
//     const throwMessage = 'owner is missing'
//     expect(() => {
//       validateCreateTodo(validateCaseDefault)
//     }).toThrow(throwMessage)
//     // throws correct message
//     expect(throwCustomError).toHaveBeenCalledWith(new Error(throwMessage), methodPath, EClassError.USER_ERROR)
//   })
// })

test.todo('to implement')
