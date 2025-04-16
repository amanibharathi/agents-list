

const AdminRedirectLink = ({
  icon,
  text,
  href = '',
}: {
  icon?: any
  text: any
  href: string
}) => {
  return (
    <a
      href={href}
      className="flex items-center gap-[10px] text-[18px] font-[500] !text-[#10295A]"
    >
      {icon && icon}
      {text}
    </a>
  )
}

export default AdminRedirectLink
