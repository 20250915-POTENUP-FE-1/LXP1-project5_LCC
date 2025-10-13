### git에 권한 넣기

ssh-keygen -t ed25519 -C "깃허브에_등록된_이메일@example.com"

### 공개 키 내용 복사

cat ~/.ssh/id_ed25519.pub

해당 키를 본인 setting
SSH and GPG keys에 키 삽입