import userEvent from '@testing-library/user-event'
import { render, screen } from '@/utils/testUtils'
import messages from '@/messages/en.json'
import { DeleteUserComponent } from '@/components/deleteUser'

describe('Delete User Component', () => {
  it('should render', () => {
    render(<DeleteUserComponent />)
    expect(screen.getByText(messages.Forms.deleteUser.deleteAccountInstructions)).toBeInTheDocument()
    expect(screen.getByTestId('delete-user-button')).toBeInTheDocument()
  })

  it('should click on delete button', async () => {
    const alertMock = jest.spyOn(window, 'confirm').mockImplementation()
    render(<DeleteUserComponent />)
    const button = screen.getByTestId('delete-user-button')
    await userEvent.click(button)
    expect(alertMock).toHaveBeenCalledTimes(1)
  })
})
