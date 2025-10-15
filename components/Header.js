import Link from 'next/link'

export default function Header(){
  return (
    <header className="header">
      <img src="/logo.svg" alt="logo" />
      <div>
        <div className="site-title">示例品牌</div>
        <div style={{ fontSize:12, color:'#666' }}>示例站点副标题</div>
      </div>
    </header>
  )
}
