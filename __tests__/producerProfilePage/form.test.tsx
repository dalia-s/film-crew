import userEvent from '@testing-library/user-event'
import { prismaMock } from '../../mocks/prismaSingleton'
import { render, screen, producerNoData, producerWithData } from '@/utils/testUtils'
import { FormWithData } from '../../src/app/[locale]/producer/profile/formData'
import * as userService from '@/utils/userService'

import messages from '@/messages/en.json'

jest.mock('@clerk/nextjs', () => {
  const originalModule = jest.requireActual('@clerk/nextjs')
  return {
    __esModule: true,
    ...originalModule,
    auth: () => ({
      userId: 123,
    }),
  }
})

jest.mock('../../src/utils/userService', () => ({
  __esModule: true,
  ...jest.requireActual('../../src/utils/userService'),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}))

describe('Producer Profile Form', () => {
  it('should render', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(producerNoData)
    render(await FormWithData())
    expect(screen.getByTestId('producer-profile-form')).toBeInTheDocument()
  })

  it('should render all form elements', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(producerNoData)
    render(await FormWithData())
    expect(screen.getByTestId('firstName-input')).toBeInTheDocument()
    expect(screen.getByTestId('lastName-input')).toBeInTheDocument()
    expect(screen.getByTestId('about-input')).toBeInTheDocument()
    expect(screen.getByTestId('projectName-input')).toBeInTheDocument()
    expect(screen.getByTestId('projectDescription-input')).toBeInTheDocument()
    expect(screen.getByLabelText('Project start date')).toBeInTheDocument()
    expect(screen.getByLabelText('Project end date')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
  })

  it('should have empty inputs if no user data', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(producerNoData)
    render(await FormWithData())
    expect(screen.getByTestId('firstName-input')).toHaveValue('')
    expect(screen.getByTestId('lastName-input')).toHaveValue('')
    expect(screen.getByTestId('about-input')).toHaveValue('')
    expect(screen.getByTestId('projectName-input')).toHaveValue('')
    expect(screen.getByTestId('projectDescription-input')).toHaveValue('')
    expect(screen.getByLabelText('Project start date')).toHaveValue('')
    expect(screen.getByLabelText('Project end date')).toHaveValue('')
  })

  it('should fill initial input values if user data exists', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(producerWithData)
    render(await FormWithData())
    expect(screen.getByTestId('firstName-input')).toHaveValue(producerWithData.firstName)
    expect(screen.getByTestId('lastName-input')).toHaveValue(producerWithData.lastName)
    expect(screen.getByTestId('about-input')).toHaveValue(producerWithData.about)
    expect(screen.getByTestId('projectName-input')).toHaveValue(producerWithData.projects[0].projectName)
    expect(screen.getByTestId('projectDescription-input')).toHaveValue(producerWithData.projects[0].projectDescription)
    expect(screen.getByLabelText('Project start date')).toHaveValue(
      producerWithData.projects[0].projectStartDate.toLocaleDateString('lt')
    )
    expect(screen.getByLabelText('Project end date')).toHaveValue(
      producerWithData.projects[0].projectEndDate.toLocaleDateString('lt')
    )
  })

  it('should should show only required field errors if saving empty form', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(producerNoData)
    render(await FormWithData())
    const button = screen.getByTestId('submit-button')
    await userEvent.click(button)
    expect(screen.getByTestId('firstName-error')).toHaveTextContent(messages.Forms.profileForm.firstNameErrM)
    expect(screen.getByTestId('lastName-error')).toHaveTextContent(messages.Forms.profileForm.lastNameErrM)
    expect(screen.getByTestId('about-error')).toBeEmptyDOMElement()
    expect(screen.getByTestId('projectName-error')).toBeEmptyDOMElement()
    expect(screen.getByTestId('projectDescription-error')).toBeEmptyDOMElement()
    expect(screen.getByTestId('projectStartDate-error')).toBeEmptyDOMElement()
    expect(screen.getByTestId('projectEndDate-error')).toBeEmptyDOMElement()
  })

  it('should show project name error if description is filled in', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(producerNoData)
    render(await FormWithData())
    await userEvent.type(screen.getByTestId('projectDescription-input'), 'Lorem ipsum...')
    const button = screen.getByTestId('submit-button')
    await userEvent.click(button)
    expect(screen.getByTestId('projectName-error')).toHaveTextContent(messages.Forms.profileForm.currentProjectNameErrM)
  })

  it('should show project name error if project start date is filled in', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(producerNoData)
    render(await FormWithData())
    await userEvent.type(screen.getByLabelText('Project start date'), new Date().toLocaleDateString('lt'))
    const button = screen.getByTestId('submit-button')
    await userEvent.click(button)
    expect(screen.getByTestId('projectName-error')).toHaveTextContent(messages.Forms.profileForm.currentProjectNameErrM)
  })

  it('should show project name error if project end date is filled in', async () => {
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(producerNoData)
    render(await FormWithData())
    await userEvent.type(screen.getByLabelText('Project end date'), new Date().toLocaleDateString('lt'))
    const button = screen.getByTestId('submit-button')
    await userEvent.click(button)
    expect(screen.getByTestId('projectName-error')).toHaveTextContent(messages.Forms.profileForm.currentProjectNameErrM)
  })

  it('should submit form data on submit button click', async () => {
    const alertMock = jest.spyOn(userService, 'saveUserDetails')
    prismaMock.user.findUniqueOrThrow.mockResolvedValue(producerNoData)
    render(await FormWithData())
    await userEvent.type(screen.getByTestId('firstName-input'), 'First Name')
    await userEvent.type(screen.getByTestId('lastName-input'), 'Last Name')
    const button = screen.getByTestId('submit-button')
    await userEvent.click(button)
    expect(alertMock).toHaveBeenCalledTimes(1)
  })
})
