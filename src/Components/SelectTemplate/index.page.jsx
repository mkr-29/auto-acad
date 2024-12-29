import React from 'react'
import "./SelectTemplate.scss"
import SelectTemplateCard from './SelectTemplateCard/index.page';
import { Link } from 'react-router-dom';

export default function SelectTemplate({
  selectedTemplate,
  setSelectedTemplate,
}) {
  return (
    <div className='select-template'>
      <h2 className='select-template-heading'>Select Template</h2>
      <div className='select-templates'>
        <SelectTemplateCard
          templateName='Template 1'
          templateId='template1'
          templateMenu={(
            <div>
              <Link to="/user/view-template">View Template</Link>
              <Link to="">Delete Template</Link>
            </div>
          )}
          onChange={() => setSelectedTemplate('template1')}
        />
        <SelectTemplateCard
          templateName='Template 2'
          templateId='template2'
          templateMenu={(
            <div>
              <Link to="">View Template</Link>
              <Link to="">Delete Template</Link>
            </div>
          )}
          onChange={() => setSelectedTemplate('template2')}
        />
      </div>
    </div>
  )
}
