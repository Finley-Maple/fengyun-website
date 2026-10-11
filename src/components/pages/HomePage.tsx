import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { localize, type Lang } from '@/lib/i18n';

const iconProps = {
  className: 'h-6 w-6',
  fill: 'none',
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  'aria-hidden': true,
};

const icons = [
  <svg key="geo" {...iconProps}>
    <circle cx="6" cy="6" r="2.25" />
    <circle cx="18" cy="6" r="2.25" />
    <circle cx="12" cy="18" r="2.25" />
    <path strokeLinecap="round" d="M8 6h8M7.2 8l3.6 8M16.8 8l-3.6 8" />
  </svg>,
  <svg key="causal" {...iconProps}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
    />
  </svg>,
  <svg key="econ" {...iconProps}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
    />
  </svg>,
];

const content = {
  en: {
    eyebrow: 'Scientific Computing Researcher',
    degree: 'M.Sc. Scientific Computing, Universität Heidelberg (2023-2026)',
    degree2: 'B.Sc. Industrial Engineering, Tsinghua University (2019-2023)',
    intro1:
      'I want to build trustworthy machine learning for health and biomedicine, systems whose answers you can inspect, not just score. More importantly, I want to build systems that can learn from data. My thesis at the German Cancer Research Center (DKFZ) asked what a spatial-transcriptomics graph model has actually learned, and whether higher accuracy really means better biology.',
    intro2: "Based in Heidelberg. Away from the keyboard, I'm usually running or cooking.",
    cv: 'View CV',
    publications: 'Publications',
    blog: 'Blog',
    photoAlt: 'Fengyun Yu standing by a lake with snow-capped mountains behind',
    interestsTitle: 'Research Interests',
    interestsSub:
      'Where machine learning meets health, and where I try to ask what a model actually knows.',
    interests: [
      {
        title: 'Interpretable Geometric Deep Learning',
        description:
          'Opening up graph neural networks for spatial transcriptomics: what their attention learns, and why accuracy metrics alone can decouple from biological meaning.',
      },
      {
        title: 'Causal Inference',
        description:
          'Discrete choice experiments and clustering on health data, from COVID-19 vaccine preferences (n=12,000) to COPD patient phenotypes (n>10,000).',
      },
      {
        title: 'Health Economics',
        description:
          'Modeling the global economic burden of chronic disease and benchmarking mortality risk prediction on large cohorts such as UK Biobank.',
      },
    ],
    blogTitle: 'Latest from the Blog',
    blogSub: 'Notes on research, engineering, and life.',
    allPosts: 'All posts →',
    viewAll: 'View all posts',
  },
  zh: {
    eyebrow: '科学计算研究者',
    degree: '海德堡大学科学计算理学硕士（2023-2026）；清华大学工业工程理学学士（2019-2023）',
    intro1:
      '我希望为医生和患者构建值得信赖的机器学习，让人能够检视答案、而不只是看分数的系统，更重要的是能够从数据中学到知识。我在德国癌症研究中心（DKFZ）的硕士论文探讨了这样的问题：一个空间转录组图模型究竟学到了什么，更高的准确率是否真的意味着更好的生物学。',
    intro2: '现居海德堡。离开电脑的时候，我喜欢跑步，做饭，以及打羽毛球。',
    cv: '查看简历',
    publications: '论文',
    blog: '博客',
    photoAlt: '余枫云站在湖边，背后是雪山',
    interestsTitle: '研究兴趣',
    interestsSub: '机器学习与健康的交汇处，也是我不断追问“模型究竟知道什么”的地方。',
    interests: [
      {
        title: '可解释的几何深度学习',
        description:
          '打开空间转录组图神经网络的“黑箱”：它的注意力学到了什么，以及为什么仅靠准确率指标会与生物学意义脱节。',
      },
      {
        title: '因果推断',
        description:
          '基于健康数据的离散选择实验与聚类分析，从新冠疫苗偏好（n=12,000）到慢阻肺患者表型（n>10,000）。',
      },
      {
        title: '健康经济学',
        description:
          '估算慢性病的全球经济负担，并在 UK Biobank 等大型队列上对死亡风险预测方法进行基准测试。',
      },
    ],
    blogTitle: '最新博客',
    blogSub: '关于研究、工程与生活的笔记。',
    allPosts: '全部文章 →',
    viewAll: '查看全部文章',
  },
};

export default function HomePage({ lang }: { lang: Lang }) {
  const t = content[lang];
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold uppercase tracking-wide text-clay-600">{t.eyebrow}</p>
              <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-navy-900 sm:text-6xl">
                {lang === 'zh' ? '余枫云' : 'Fengyun Yu'}
              </h1>
              <p className="mt-4 text-lg text-navy-500">{t.degree}</p>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">{t.intro1}</p>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">{t.intro2}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={localize(lang, '/cv')} className="btn-primary">
                  {t.cv}
                </Link>
                <Link href={localize(lang, '/publications')} className="btn-secondary">
                  {t.publications}
                </Link>
                <Link href={localize(lang, '/blog')} className="btn-accent">
                  {t.blog}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="mx-auto max-w-sm rotate-2 rounded-2xl border border-navy-100 bg-white p-3 shadow-xl transition-transform duration-300 hover:rotate-0">
                <Image
                  src="/assets/fengyun-lake.jpg"
                  alt={t.photoAlt}
                  width={1000}
                  height={1100}
                  priority
                  className="h-auto w-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section className="bg-navy-50/60 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy-900">{t.interestsTitle}</h2>
          <p className="mt-2 text-lg text-gray-500">{t.interestsSub}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.interests.map((interest, i) => (
              <div key={interest.title} className="card">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
                  {icons[i]}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy-900">{interest.title}</h3>
                <p className="mt-2 text-gray-600">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      {recentPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-navy-900">{t.blogTitle}</h2>
                <p className="mt-2 text-lg text-gray-500">{t.blogSub}</p>
              </div>
              <Link
                href={localize(lang, '/blog')}
                className="hidden text-sm font-medium text-clay-700 hover:underline sm:block"
              >
                {t.allPosts}
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {recentPosts.map((post) => (
                <Link key={post.slug} href={localize(lang, `/blog/${post.slug}`)} className="card block">
                  <p className="text-sm text-gray-500">{post.date}</p>
                  <h3 className="mt-1 text-lg font-semibold text-navy-900">{post.title}</h3>
                  {post.excerpt && <p className="mt-2 text-gray-600">{post.excerpt}</p>}
                  {post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-clay-50 px-2 py-1 text-xs font-medium text-clay-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href={localize(lang, '/blog')} className="btn-accent">
                {t.viewAll}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
