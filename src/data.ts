import codeCouple from "../vibecoding作品/情侣配对度测验.png?url";
import codeLiterature from "../vibecoding作品/测测你的文学精神故乡.png?url";
import photoGujin from "../照片/古今.jpg?url";
import photoHaitang from "../照片/海棠.jpg?url";
import photoQianfo from "../照片/代表/千佛.jpg?url";
import photoSmile from "../照片/微笑.jpg?url";
import photoVictoria from "../照片/维多利亚港.jpg?url";
import photoYuenLong from "../照片/元朗.JPG?url";
import photoYulan from "../照片/玉兰.jpg?url";
import designEvita from "../设计/代表/阿根廷，别为我哭泣.jpg?url";
import designMap from "../设计/廿载芳华，共绘版图.png?url";
import designRed from "../设计/半点红艳.jpg?url";
import designSpring from "../设计/把春天夹进书里.png?url";
import designXuancheng from "../设计/宣城.png?url";
import videoFirstNight from "../视频/代表/与泽同居的第一夜.mp4?url";
import videoRoundTable from "../视频/四方的圆桌.mp4?url";
import videoThousandYears from "../视频/一问千年，重现眼前.mp4?url";
import videoYanbuyouzhong from "../视频/言不由衷.mp4?url";

export type CategoryKey = "photo" | "video" | "design" | "code";

export type Work = {
  id: string;
  category: CategoryKey;
  title: string;
  cover: string;
  mediaType: "image" | "video";
  layout?: "wide" | "tall";
  featured?: boolean;
  description: string;
};

export const categoryOrder: CategoryKey[] = ["photo", "video", "design", "code"];

export const categories: Record<CategoryKey, { label: string; en: string }> = {
  photo: { label: "摄影", en: "Photography" },
  video: { label: "影像", en: "Motion" },
  design: { label: "设计", en: "Design" },
  code: { label: "代码实验", en: "Vibe Coding" },
};

export const works: Work[] = [
  {
    id: "photo-qianfo",
    category: "photo",
    title: "千佛",
    cover: photoQianfo,
    mediaType: "image",
    layout: "wide",
    featured: true,
    description: "摄于大同云冈石窟，使用高对比黑白方式进行后期处理，表现今人触碰千年遗迹的震撼时刻。",
  },
  {
    id: "photo-yuen-long",
    category: "photo",
    title: "元朗",
    cover: photoYuenLong,
    mediaType: "image",
    layout: "wide",
    description: "摄于香港元朗，采用纵深构图，利用元朗独特的有轨电车，表现香港北独特而繁忙的城市风貌。",
  },
  {
    id: "photo-victoria",
    category: "photo",
    title: "维多利亚港",
    cover: photoVictoria,
    mediaType: "image",
    layout: "wide",
    description: "摄于香港维多利亚港，采用高饱和度红色与黑白色背景对比的处理方式，体现香港在回归后更加兴旺繁荣的发达景象。",
  },
  {
    id: "photo-gujin",
    category: "photo",
    title: "古今",
    cover: photoGujin,
    mediaType: "image",
    layout: "wide",
    description: "摄于香港维多利亚港，采用高饱和度红色与黑白色背景对比的处理方式，让古船与今城相遇，碰撞出香港近现代发展历程的城市魄力。",
  },
  {
    id: "photo-smile",
    category: "photo",
    title: "微笑",
    cover: photoSmile,
    mediaType: "image",
    layout: "tall",
    description: "摄于大同华严寺，拍摄主体为合掌露齿胁侍菩萨，使用LR进行后期修复，降低噪点，丰富色彩，尽力还原了辽代塑像的特别魅力。",
  },
  {
    id: "photo-yulan",
    category: "photo",
    title: "玉兰",
    cover: photoYulan,
    mediaType: "image",
    layout: "wide",
    description: "摄于杭州法喜寺，使用广角镜头自下往上拍摄，展现了古玉兰花盛放时漫天遍野的繁盛景象。",
  },
  {
    id: "photo-haitang",
    category: "photo",
    title: "海棠",
    cover: photoHaitang,
    mediaType: "image",
    layout: "wide",
    description: "摄于杭州，使用了大胆的国风调色，使盛放的海棠花呈现国画质感，系列组图于小红书获得破四万浏览量，点赞收藏破两千。（此处为首图）",
  },
  {
    id: "video-first-night",
    category: "video",
    title: "与泽同居的第一夜",
    cover: videoFirstNight,
    mediaType: "video",
    layout: "wide",
    featured: true,
    description: "全程由一人使用Libtv制作，独立完成剧本创作、分镜设计、视频生成与剪辑、配音配乐，用于运营个人账号。",
  },
  {
    id: "video-round-table",
    category: "video",
    title: "四方的圆桌",
    cover: videoRoundTable,
    mediaType: "video",
    layout: "wide",
    description: "全国高校数字艺术设计大赛参赛作品，主要使用Libtv制作，本人负责视频中段的一分钟视频制作，以及全片分镜设计与人物、场景、物品资产图生成。采用了在场景中使用有色框标注的方法，攻克多人场景站位问题，负责片段全部人物方位正确。（获奖状况正在评审中）",
  },
  {
    id: "video-thousand-years",
    category: "video",
    title: "一问千年，重现眼前",
    cover: videoThousandYears,
    mediaType: "video",
    layout: "wide",
    description: "大广赛参赛作品，本人负责选题策划、分镜设计、20秒视频生成，主要使用万镜一刻制作，根据阿里云赛道千问大模型命题，把控品牌视觉调性，成片提交参赛。（获奖情况正在评审中）",
  },
  {
    id: "video-yanbuyouzhong",
    category: "video",
    title: "言不由衷",
    cover: videoYanbuyouzhong,
    mediaType: "video",
    layout: "wide",
    description: "带队完成3分钟命题科幻动画短片，依托即梦Seedance1.5模型完成全流程AIGC创作；针对早期模型人物不稳定问题，搭建统一提示词方案解决角色与场景一致性问题，制作场景资产图，统筹剧本、配音、素材整合全流程，获国家二等奖。",
  },
  {
    id: "design-evita",
    category: "design",
    title: "阿根廷，别为我哭泣",
    cover: designEvita,
    mediaType: "image",
    layout: "tall",
    featured: true,
    description: "使用AI制作，采用简约的图文不规则排列组合形式，为经典音乐剧《EVITA》复排献礼。",
  },
  {
    id: "design-red",
    category: "design",
    title: "半点红艳",
    cover: designRed,
    mediaType: "image",
    layout: "tall",
    description: "个人摄影集封面海报，使用AI制作，将维多利亚港风貌与突出的国旗元素碰撞，提升摄影集整体蕴意。",
  },
  {
    id: "design-map",
    category: "design",
    title: "廿载芳华，共绘版图",
    cover: designMap,
    mediaType: "image",
    layout: "wide",
    description: "使用AI制作，是为学院活动准备的大型展板，使用简单的配色方案，背景使用过往活动图片拼贴，彰显主办方悠久丰富的办学历史。",
  },
  {
    id: "design-xuancheng",
    category: "design",
    title: "宣城",
    cover: designXuancheng,
    mediaType: "image",
    layout: "tall",
    description: "使用PS制作，作者个人摄影作品转为海报的尝试，文字颜色与图片主色调呼应，打造复古和谐的氛围感。",
  },
  {
    id: "design-spring",
    category: "design",
    title: "把春天夹进书里",
    cover: designSpring,
    mediaType: "image",
    layout: "wide",
    description: "使用AI制作，是为学院活动准备的KT版，大胆地使用了充满青春活力的配色，配合活动主题。",
  },
  {
    id: "code-literature",
    category: "code",
    title: "测测你的文学精神故乡",
    cover: codeLiterature,
    mediaType: "image",
    layout: "wide",
    featured: true,
    description: "使用claudecode编写上线，抓住目标群体大学生进行宣传，访问量于三天内破千。 网址：www.wenxue.bond",
  },
  {
    id: "code-couple",
    category: "code",
    title: "情侣配对度测验",
    cover: codeCouple,
    mediaType: "image",
    layout: "wide",
    description: "使用claudecode编写上线，向情侣群体进行宣传，访问量已累计达到1500。 网址：coupletest.xyz",
  },
];
