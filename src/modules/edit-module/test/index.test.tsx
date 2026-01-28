import { vi } from 'vitest';

import * as api from '../api';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Module } from '../ui';
import { default_params } from '../contants';


const new_parameters_name = ['Новый_1', 'Новый_2', 'Новый_3', 'Новый_4'];

// const syncMock = vi.fn()

vi.mock('../api', () => {
  return {
    getServerModel: vi.fn(() => Promise.resolve(default_params)),
    syncClientToServer: vi.fn(() => Promise.resolve()),
  };
});

describe('ParamEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // (api.syncClientToServer as unknown as ReturnType<typeof vi.fn>)
    //   .mockResolvedValue(undefined);
  });
  it('should render only default params', async () => {
    render(<Module />);

    await waitFor(() => {
      default_params.forEach((p) => {
        expect(screen.getByText(p.name)).toBeInTheDocument();
        expect(screen.getByRole(`input-for-${p.id}`)).toBeInTheDocument();
      });
    });

  });

  it('should add new params with type string', async () => {
    render(<Module />);

    const addBtn = screen.getByRole('add-new-field-button');

    const addInput = screen.getByRole('add-new-field-input');

    const addSelect = screen.getByRole('add-new-field-select');

    expect(addBtn).toBeInTheDocument();
    expect(addInput).toBeInTheDocument();
    expect(addSelect).toBeInTheDocument();

    const user = userEvent.setup();

    for (const p of new_parameters_name) {
      await user.clear(addInput);
      await user.type(addInput, p);
      await user.click(addBtn);

      expect(await screen.findByText(p)).toBeInTheDocument();
    }
  });

  it('shouldnt add new paramets, because not click', async () => {
    render(<Module />);

    const addBtn = screen.getByRole('add-new-field-button');

    const addInput = screen.getByRole('add-new-field-input');

    const addSelect = screen.getByRole('add-new-field-select');

    expect(addBtn).toBeInTheDocument();
    expect(addInput).toBeInTheDocument();
    expect(addSelect).toBeInTheDocument();

    const user = userEvent.setup();

    for (const index in new_parameters_name) {
      const p = new_parameters_name[index];

      await user.clear(addInput);
      await user.type(addInput, p);

      if (Number(index) % 2) {
        await user.click(addBtn);
        expect(await screen.findByText(p)).toBeInTheDocument();
      } else {
        expect(await screen.queryByText(p)).not.toBeInTheDocument();
      }
    }
  });

  it('should add new params with type checkbox', async () => {
    render(<Module />);

    const addBtn = screen.getByRole('add-new-field-button');

    const addInput = screen.getByRole('add-new-field-input');

    const addSelect = screen.getByRole('add-new-field-select');

    expect(addBtn).toBeInTheDocument();
    expect(addInput).toBeInTheDocument();
    expect(addSelect).toBeInTheDocument();

    const user = userEvent.setup();

    for (const p of new_parameters_name) {
      await user.clear(addInput);
      await user.type(addInput, p);
      await user.click(addSelect);

      const optionValue = screen.getByRole('option', { name: 'Чекбокс' });
      user.selectOptions(addSelect, optionValue);
      expect(optionValue).toBeInTheDocument();

      await user.click(addBtn);

      expect(await screen.findByText(p)).toBeInTheDocument();

      const newParametr = screen.getByLabelText(p);
      expect(newParametr).toHaveAttribute('type', 'checkbox');
      expect(newParametr).toBeInTheDocument();
    }
  });

  it('should sync client with server model', async () => {
    const syncMock = vi.spyOn(api, 'syncClientToServer');
  
    const { unmount } = render(<Module />);
  
    await waitFor(() => {
      expect(screen.getByRole('add-new-field-input')).toBeInTheDocument();
    });
  
    unmount();
  
    await waitFor(() => {
      expect(syncMock).toHaveBeenCalledTimes(1);
    });
  });
});
