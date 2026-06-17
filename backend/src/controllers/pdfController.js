import logger from '../utils/logger.js';

const buildPublicRecordUrl = (recordId) => {
  const base = (process.env.APP_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
  if (!recordId) return `${base}/records`;
  return `${base}/records/${recordId}`;
};

// @desc    Generate share payload for WhatsApp/PDF flow
// @route   POST /api/pdf/share-payload
// @access  Private (superadmin only)
export const generateSharePayload = async (req, res, next) => {
  try {
    const { moduleType, title, summary, recordId } = req.body;

    const link = buildPublicRecordUrl(recordId);
    const message = [
      `X Suite Report (${moduleType.toUpperCase()})`,
      `Title: ${title}`,
      summary ? `Summary: ${summary}` : null,
      `Link: ${link}`
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    logger.info('Generated PDF/WhatsApp share payload', {
      moduleType,
      recordId: recordId || null,
      byUser: req.user?.username || 'unknown'
    });

    res.status(200).json({
      success: true,
      message: 'Share payload generated successfully',
      data: {
        moduleType,
        title,
        summary,
        link,
        whatsappUrl,
        // Groundwork placeholders for next step (actual PDF generation + Blob upload)
        pdf: {
          status: 'pending-implementation',
          storage: 'vercel-blob',
          fileUrl: null
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
