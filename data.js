// 将来的にはこのファイルに「授業演習用のデータ」も追加できるように設計しています。

const appData = {
  // 学生マスター（学籍番号、氏名）
  // 演習システム側からもこのマスターを参照できるようにします
  students: [
    {
        "id": "26211001",
        "name": "岩崎 晃弥"
    },
    {
        "id": "26211002",
        "name": "亀田 凌輔"
    },
    {
        "id": "26211003",
        "name": "黒田 将希"
    },
    {
        "id": "26211004",
        "name": "中本 琉雅"
    },
    {
        "id": "26211005",
        "name": "西川 天"
    },
    {
        "id": "26211007",
        "name": "小野瀬 蓮生"
    },
    {
        "id": "26212001",
        "name": "川上 毅士"
    },
    {
        "id": "26212002",
        "name": "佐々木 瑚太郎"
    },
    {
        "id": "26212003",
        "name": "西本 悠愛"
    },
    {
        "id": "26212004",
        "name": "畑下 菫晴"
    },
    {
        "id": "26212005",
        "name": "松坂 杏里"
    },
    {
        "id": "26212006",
        "name": "宮本 茜音"
    },
    {
        "id": "25211017",
        "name": "六川 心琴"
    },
    {
        "id": "25212001",
        "name": "池田 風助"
    },
    {
        "id": "25212002",
        "name": "小倉 礼之"
    },
    {
        "id": "25212004",
        "name": "清原 光穂"
    },
    {
        "id": "25212005",
        "name": "光野 友翔"
    },
    {
        "id": "25212006",
        "name": "中 悠翔"
    },
    {
        "id": "25212007",
        "name": "野村 勇介"
    }
],
  
  // 本番の試験・面接予定と結果
  exams: [
    { "studentId": "26211007", "examName": "橋本市", "stage": "1次試験", "examContent": "", "date": "", "status": "不合格", "remarks": "" },
    { "studentId": "26211002", "examName": "橋本市 消防", "stage": "1次試験", "examContent": "", "date": "", "status": "不合格", "remarks": "" },
    { "studentId": "25212002", "examName": "公立那賀病院", "stage": "1次試験", "examContent": "", "date": "", "status": "不合格", "remarks": "一次と二次両方同時に実施" },
    { "studentId": "25212001", "examName": "和泉市", "stage": "1次試験", "examContent": "", "date": "", "status": "不合格", "remarks": "" },
    { "studentId": "26211002", "examName": "和泉市 消防", "stage": "1次試験", "examContent": "", "date": "", "status": "不合格", "remarks": "" },
    { "studentId": "25212007", "examName": "橋本市", "stage": "1次試験", "examContent": "", "date": "", "status": "不合格", "remarks": "" },
    { "studentId": "25212007", "examName": "紀の川市", "stage": "1次試験", "examContent": "", "date": "", "status": "不合格", "remarks": "" },
    { "studentId": "26211004", "examName": "守口門真 消防", "stage": "1次試験", "examContent": "", "date": "", "status": "不合格", "remarks": "" },
    { "studentId": "26212005", "examName": "大阪府警察", "stage": "1次試験", "examContent": "", "date": "", "status": "合格", "remarks": "" },
    { "studentId": "26212005", "examName": "大阪府警察", "stage": "2次試験", "examContent": "", "date": "2026-10-20", "status": "結果待ち", "remarks": "午後1:00〜 会場: 大阪府咲洲庁舎" },
    { "studentId": "26211007", "examName": "裁判所事務官", "stage": "1次試験", "examContent": "", "date": "", "status": "合格", "remarks": "" },
    { "studentId": "26211007", "examName": "裁判所事務官", "stage": "2次試験", "examContent": "", "date": "2026-10-21", "status": "結果待ち", "remarks": "会場: 和歌山地方裁判所" },
    { "studentId": "25211017", "examName": "湯浅町", "stage": "1次試験", "examContent": "", "date": "", "status": "合格", "remarks": "" },
    { "studentId": "25211017", "examName": "湯浅町", "stage": "2次試験", "examContent": "個人面接", "date": "2026-10-31", "status": "結果待ち", "remarks": "" },
    { "studentId": "25211017", "examName": "裁判所事務官", "stage": "1次試験", "examContent": "", "date": "", "status": "合格", "remarks": "" },
    { "studentId": "25211017", "examName": "裁判所事務官", "stage": "2次試験", "examContent": "人物試験", "date": "2026-10-21", "status": "結果待ち", "remarks": "" },
    { "studentId": "25212004", "examName": "裁判所事務官", "stage": "1次試験", "examContent": "", "date": "", "status": "不合格", "remarks": "" },
    { "studentId": "26211007", "examName": "国家税務", "stage": "1次試験", "examContent": "", "date": "", "status": "合格", "remarks": "" },
    { "studentId": "26211007", "examName": "国家税務", "stage": "2次試験", "examContent": "", "date": "2026-10-15", "status": "結果待ち", "remarks": "12:15〜 会場: 大阪合同庁舎" },
    { "studentId": "25212004", "examName": "国家税務", "stage": "1次試験", "examContent": "", "date": "", "status": "合格", "remarks": "" },
    { "studentId": "25212004", "examName": "国家税務", "stage": "2次試験", "examContent": "", "date": "2026-10-14", "status": "結果待ち", "remarks": "12:00〜 会場: 大阪合同庁舎" },
    { "studentId": "25212004", "examName": "和歌山市", "stage": "1次試験", "examContent": "", "date": "", "status": "不合格", "remarks": "" },
    { "studentId": "25212002", "examName": "国家税務", "stage": "1次試験", "examContent": "", "date": "", "status": "合格", "remarks": "" },
    { "studentId": "25212002", "examName": "国家税務", "stage": "2次試験", "examContent": "人物試験・身体検査", "date": "2026-10-14", "status": "結果待ち", "remarks": "12:00受付開始 12:15試験開始" },
    { "studentId": "25212002", "examName": "和歌山市", "stage": "1次試験", "examContent": "", "date": "", "status": "不合格", "remarks": "" },
    { "studentId": "26212002", "examName": "国家税務", "stage": "1次試験", "examContent": "", "date": "", "status": "合格", "remarks": "" },
    { "studentId": "26212002", "examName": "国家税務", "stage": "2次試験", "examContent": "身体検査・個別面接", "date": "2026-10-14", "status": "結果待ち", "remarks": "近畿" },
    { "studentId": "25212001", "examName": "国家税務", "stage": "1次試験", "examContent": "", "date": "", "status": "不合格", "remarks": "" },
    { "studentId": "26211003", "examName": "国家税務", "stage": "1次試験", "examContent": "", "date": "", "status": "合格", "remarks": "" },
    { "studentId": "26211003", "examName": "国家税務", "stage": "2次試験", "examContent": "", "date": "2026-10-14", "status": "結果待ち", "remarks": "" },
    { "studentId": "25212006", "examName": "国家税務", "stage": "1次試験", "examContent": "", "date": "", "status": "合格", "remarks": "" },
    { "studentId": "25212006", "examName": "国家税務", "stage": "2次試験", "examContent": "", "date": "", "status": "結果待ち", "remarks": "日程未定" },
    { "studentId": "26211002", "examName": "和泉市", "stage": "1次試験", "examContent": "", "date": "", "status": "不合格", "remarks": "" },
    { "studentId": "25212007", "examName": "国家税務", "stage": "1次試験", "examContent": "", "date": "", "status": "合格", "remarks": "" },
    { "studentId": "25212007", "examName": "国家税務", "stage": "2次試験", "examContent": "", "date": "2026-10-14", "status": "結果待ち", "remarks": "" },
    { "studentId": "25211017", "examName": "国家税務", "stage": "1次試験", "examContent": "", "date": "", "status": "合格", "remarks": "" },
    { "studentId": "25211017", "examName": "国家税務", "stage": "2次試験", "examContent": "", "date": "2026-10-14", "status": "結果待ち", "remarks": "" },
    { "studentId": "25211017", "examName": "和歌山県警察", "stage": "1次試験", "examContent": "", "date": "", "status": "辞退", "remarks": "湯浅町と被ったため" },
    { "studentId": "26211002", "examName": "国家税務", "stage": "1次試験", "examContent": "", "date": "", "status": "辞退", "remarks": "行かなかった" }
  ]
};
