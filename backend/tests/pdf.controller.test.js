import { generateSharePayload } from '../src/controllers/pdfController.js';
import { jest } from '@jest/globals';

describe('PDF Controller - generateSharePayload', () => {
  const createRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  test('should generate whatsapp share payload with record link', async () => {
    const req = {
      body: {
        moduleType: 'sale',
        title: 'Sale Report',
        summary: 'Net profit AED 100,000',
        recordId: 'abc123'
      },
      user: { username: 'umair' }
    };
    const res = createRes();
    const next = jest.fn();

    await generateSharePayload(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);

    const payload = res.json.mock.calls[0][0];
    expect(payload.success).toBe(true);
    expect(payload.data.moduleType).toBe('sale');
    expect(payload.data.link).toContain('/records/abc123');
    expect(payload.data.whatsappUrl).toContain('wa.me');
    expect(payload.data.pdf.status).toBe('pending-implementation');
  });

  test('should fallback to generic records link when recordId is empty', async () => {
    const req = {
      body: {
        moduleType: 'rent',
        title: 'Rent Report',
        summary: '',
        recordId: ''
      },
      user: { username: 'umair' }
    };
    const res = createRes();
    const next = jest.fn();

    await generateSharePayload(req, res, next);

    expect(next).not.toHaveBeenCalled();
    const payload = res.json.mock.calls[0][0];
    expect(payload.data.link.endsWith('/records')).toBe(true);
  });
});
