import { useEffect, useState } from "react"
import { useAuthStore } from "../stores/useAuthStore";
import supabase from "../utils/supabase";

export default function MyPage() {
	const { user } = useAuthStore();
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [profileFile, setProfileFile] = useState<File | null>(null)
	const [nickname, setNickname] = useState("");
	const [isUploading, setIsUploading] = useState(false);

	const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(e.target.value);
	}

	useEffect(() => {
		if (user) {
			setNickname(user.nickname);
			setPreviewImage(user.img_url)
		}
	}, [user]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setPreviewImage(e.target?.result as string);
			}
			reader.readAsDataURL(file);
			setProfileFile(file);
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user) return;

		try {
			setIsUploading(true);
			const updateData = {
				nickname,
				img_url: previewImage,
			}

			if (profileFile) {
				const fileExt = profileFile.name.split(".").pop();
				const filePath = `${user.id}/${Date.now()}.${fileExt}`
				
				// 1. Storage에 이미지 업로드
				const { error: uploadError } = await supabase.storage
					.from("profile_images")
					.upload(filePath, profileFile, {
						cacheControl: "3600",
						upsert: false
					});

				if (uploadError) {
					throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
				}

				// 2. 공개 URL 가져오기
				const { data: { publicUrl } } = supabase.storage
					.from("profile_images")
					.getPublicUrl(filePath);

				updateData.img_url = publicUrl;
			}

			// 3. Auth 메타데이터 업데이트
			const { error: userError } = await supabase.auth.updateUser({
				data: updateData
			});

			if (userError) {
				throw new Error(`사용자 정보 업데이트 실패: ${userError.message}`);
			}

			// 4. users 테이블 업데이트 - 여기를 수정
			const { error: dbError } = await supabase
				.from("users")
				.update({
					nickname: updateData.nickname,
					img_url: updateData.img_url,
					updated_at: new Date().toISOString()
				})
				.eq("id", user.id);

			if (dbError) {
				throw new Error(`데이터베이스 업데이트 실패: ${dbError.message}`);
			}

			alert("프로필이 성공적으로 업데이트되었습니다.");

		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			setIsUploading(false);
		}
	}

	return (
		<div className="max-w-2xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-8">마이페이지</h1>

			<div className="space-y-6">
				<div className="flex items-center space-x-4">
					<div className="relative">
						<img
							src={previewImage || "/default-profile.jpg"}
							alt="프로필 이미지"
							className="w-24 h-24 rounded-full object-cover"
						/>
						<input
							type="file"
							id="profileImage"
							accept="image/*"
							className="hidden"
							onChange={handleFileChange}
						/>
						<label
							htmlFor="profileImage"
							className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 cursor-pointer"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</label>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							이메일
						</label>
						<input
							type="email"
							id="email"
							value={user?.email}
							disabled
							className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-300 text-gray-500 cursor-not-allowed"
						/>
					</div>

					<div>
						<label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
							닉네임
						</label>
						<input
							type="text"
							id="nickname"
							value={nickname}
							onChange={handleNicknameChange}
							placeholder="닉네임을 입력하세요"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>

					<div className="flex justify-end">
						<button
							type="submit"
							disabled={isUploading}
							className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
								${isUploading ? "opacity-50 cursor-not-allowed" : ""}
								`}
						>
							{isUploading ? "업로드 중..." : "저장하기"}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}