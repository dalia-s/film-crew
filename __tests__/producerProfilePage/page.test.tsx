import { render, screen } from '@/utils/testUtils'
import messages from '@/messages/en.json'
import { Page as ProducerProfilePage } from '../../src/app/[locale]/producer/profile/page'

jest.mock('../../src/app/[locale]/producer/profile/formData', () => ({
  FormWithData: () => <div />,
}))

describe('Producer Profile Page', () => {
  it('should render', () => {
    render(<ProducerProfilePage />)
    expect(screen.getByText(messages.PageNames.producerProfile)).toBeInTheDocument()
    expect(screen.getByTestId('delete-user-element')).toBeInTheDocument()
  })
})
