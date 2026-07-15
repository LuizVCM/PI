// response utils

export const success = (res, data) => res.status(200).json({ success: true, data });
export const error = (res, message, status = 400) => res.status(status).json({ success: false, error: message });
