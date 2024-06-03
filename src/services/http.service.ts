import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import toast from 'react-hot-toast'

const host =
  typeof window !== 'undefined' && window.location.hostname
    ? window.location.protocol + '//' + window.location.hostname
    : ''

export const baseUrl = process.env.NODE_ENV === 'production' ? `https://swapi.dev/api/` : `https://swapi.dev/api/`

// TYPES
import { IService, EHttpMethod } from '../types'

class HttpService {
  private http: AxiosInstance
  public baseURL = baseUrl

  constructor() {
    this.http = axios.create({
      baseURL: this.baseURL,
      withCredentials: false,
      headers: this.setupHeaders()
    })
    this.service()
  }

  // Get authorization token for requests
  private get getAuthorization() {
    const accessToken = globalThis.window?.localStorage.getItem('accessToken') || ''

    return accessToken ? { Authorization: `Bearer ${accessToken}` } : ''
  }

  // Get Language for requests
  private get getLanguage() {
    const language = globalThis.window?.localStorage.getItem('i18nextLng') || ''

    return language ? { 'Accept-Language': language } : ''
  }

  // Initialize service configuration
  public service() {
    this.injectInterceptors()

    return this
  }

  // Set up request headers
  private setupHeaders(hasAttachment = false) {
    return hasAttachment
      ? {
        'Content-Type': 'multipart/form-data', ...this.getAuthorization, ...this.getLanguage }
      : { 'Content-Type': 'application/json', ...this.getAuthorization, ...this.getLanguage }
  }

  // Handle HTTP requests
  private async request<T>(method: EHttpMethod, url: string, options: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.http.request<T>({
        method,
        url,
        ...options
      })

      return response.data
    } catch (error) {
      return this.normalizeError(error)
    }
  }

  // Perform GET request
  public async get<T>(url: string, params?: IService.IParams, hasAttachment = false): Promise<T> {
    return this.request<T>(EHttpMethod.GET, url, {
      params,
      headers: this.setupHeaders(hasAttachment)
    })
  }

  // Perform POST request
  public async push<T, P>(url: string, payload: P, params?: IService.IParams, hasAttachment = false): Promise<T> {
    return this.request<T>(EHttpMethod.POST, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment)
    })
  }

  // Perform UPDATE request
  public async update<T, P>(url: string, payload: P, params?: IService.IParams, hasAttachment = false): Promise<T> {
    return this.request<T>(EHttpMethod.PATCH, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment)
    })
  }

  // Perform DELETE request
  public async remove<T>(url: string, params?: IService.IParams, hasAttachment = false): Promise<T> {
    return this.request<T>(EHttpMethod.DELETE, url, {
      params,
      headers: this.setupHeaders(hasAttachment)
    })
  }

  // Inject interceptors for request and response
  private injectInterceptors() {
    // Set up request interceptor
    this.http.interceptors.request.use(request => {
      // * Perform an action
      // TODO: implement an NProgress
      return request
    })

    // Set up response interceptor
    this.http.interceptors.response.use(
      response => {
        return response
      },

      error => {
        toast.error(error.response?.data?.message)

        return Promise.reject(error)
      }
    )
  }

  // Normalize errors
  private normalizeError(error: any) {
    return Promise.reject(error)
  }
}

export { HttpService as default }
