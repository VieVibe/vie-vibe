import { describe, expect, it } from 'vitest'
import { searchDemoApps } from '../components/products/glintDemo'

describe('Glint website search demo', () => {
  it.each(['微信', 'weixin', 'WX', 'WeChat', '  wx  '])('finds 微信 by %s', (query) => {
    expect(searchDemoApps(query).map((app) => app.name)).toEqual(['微信'])
  })

  it('supports prefixes and has an empty state for unmatched queries', () => {
    expect(searchDemoApps('记事').map((app) => app.name)).toEqual(['记事本'])
    expect(searchDemoApps('不存在的软件')).toEqual([])
    expect(searchDemoApps('')).toHaveLength(4)
  })
})
