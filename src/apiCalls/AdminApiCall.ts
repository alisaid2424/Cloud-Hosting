import { DOMAIN } from "@/utils/constants";
import { Comment } from "@prisma/client";

// Get Comments Based on pageNumber
interface GetAllCommentsProps {
	token: string;
	pageNumber: string | undefined;
}

export async function GetAllComments({
	token,
	pageNumber,
}: GetAllCommentsProps): Promise<Comment[]> {
	const res = await fetch(`${DOMAIN}/api/comments?pageNumber=${pageNumber}`, {
		headers: {
			Cookie: `jwtToken=${token}`,
		},
	});

	if (!res.ok) {
		throw new Error("Failed To Fatch comments");
	}

	return res.json();
}
