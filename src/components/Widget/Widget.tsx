import React from 'react'
import useJsonFetch from '../../hooks/useJsonFetch';

interface IWidget {
  title: string;
  url: string;
}

interface IData {
  status: string;
}

export const Widget: React.FC<IWidget> = ({title, url}) => {
  const [data, loading, error] = useJsonFetch<IData>(url);
  
  function getContent() : React.ReactNode {
    if (error) return (
      <div className="error"> { `Произошла ошибка! ${error}` }</div>
    );
    if (loading) return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
    if (data) return (
      <p className={`widget-text`}>Статус: {`${data?.status === 'ok' ? '☑' : '☒'}`}</p>
    );
    
  }

  return (
    <div className="widget">
      <h2 className="widget-title">{title}</h2>
      <div className="widget-body">
        { getContent() }
      </div>
    </div>
  )
}
