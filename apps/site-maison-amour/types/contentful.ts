export interface ContentfulImage {
    metadata: {
        tags: any[]
        concepts: any[]
    }
    sys: {
        space: {
            sys: {
                type: string
                linkType: string
                id: string
            }
        }
        id: string
        type: string
        createdAt: string
        updatedAt: string
        environment: {
            sys: {
                id: string
                type: string
                linkType: string
            }
        }
        publishedVersion: number
        revision: number
        locale: string
    }
    fields: {
        title: string
        file: {
            url: string
            details: {
                size: number
                image: {
                    width: number
                    height: number
                }
            }
            fileName: string
            contentType: string
        }
    }
}

export interface RichTextContent {
    data: Record<string, any>
    content: Array<{
        data: Record<string, any>
        content: Array<{
            data: Record<string, any>
            marks: any[]
            value: string
            nodeType: string
        }>
        nodeType: string
    }>
    nodeType: string
}

export interface HomePageData {
    title?: string
    description?: {
        content?: Array<{
            content?: Array<{
                value?: string
            }>
        }>
    }
    heroImg?: ContentfulImage
    leftImg?: ContentfulImage
    rightImg?: ContentfulImage
    leftText?: string
    rightText?: string
}

export interface RestaurantPageData {
    heroImg: ContentfulImage
    title: string
    subtitle: string
    description: string
    
    brutusTitle: string
    brutusDescription: RichTextContent
    brutusCtaText: string
    brutusImg: ContentfulImage
    
    maillardTitle: string
    maillardDescription: RichTextContent
    maillardCtaText: string
    maillardImg: ContentfulImage
    
    grammaTitle: string
    grammaDescription: RichTextContent
    grammaCtaText: string
    grammaImg: ContentfulImage
    
    bacchusTitle: string
    bacchusDescription: RichTextContent
    bacchusCtaText: string
    bacchusImg: ContentfulImage
} 