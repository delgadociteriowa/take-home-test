import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: '1', name: 'Test File 1', mimeType: 'application/pdf' },
        { id: '2', name: 'Test File 2', mimeType: 'image/png' },
      ]),
  })
);

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Displays a greeting message when the user is authenticated.', async () => {
    useSession.mockReturnValue({
      data: { user: { name: 'John' } },
      status: 'authenticated',
    });

    render(<Home />);

    expect(await screen.findByText(/Welcome, John/i)).toBeInTheDocument();
  });

  test('Displays the Google Drive files when the user is authenticated.', async () => {
    useSession.mockReturnValue({
      data: { user: { name: 'John Doe' } },
      status: 'authenticated',
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/Test File 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Test File 2/i)).toBeInTheDocument();
    });
  });

  test('Displays the welcome message when the user is not authenticated', () => {
    useSession.mockReturnValue({ data: null, status: 'unauthenticated' });

    render(<Home />);

    expect(screen.getByText(/Welcome to DriveApp/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Login or register now to start managing your files./i)
    ).toBeInTheDocument();
  });
});
