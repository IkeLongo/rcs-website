import { NextResponse } from "next/server";
import { ovhPool } from '@/lib/db/mysql';

export async function GET() {
	try {
		// Run a simple query to test connection
		const [rows] = await ovhPool.query('SELECT 1 AS test');
		return NextResponse.json({
			ok: true,
			db: rows,
		});
	} catch (error: any) {
		return NextResponse.json({
			ok: false,
			error: error.message || error.toString(),
		}, { status: 500 });
	}
}
