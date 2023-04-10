export const Branch = {
	MARKETING: 'MK',
	DESIGN: 'DS',
	PROGRAMMING: 'PG',
	CONTENT: 'CT'
} as const;
export type Branch = (typeof Branch)[keyof typeof Branch];
